const fs = require("fs");
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const qr = require('qrcode');
const Jimp = require('jimp');

router.use(bodyParser.json());

router.post("/", (req, res) => {
    //response payload
    var aResponse = {
        successful: false,
        data: null,
        message: null,
    };

    // var UserBasicInfo ={
    //     username: null,
    //     email: null,
    //     onboardLevel: false,
    // };
    //const { qrData, logoImagePath } = req.body;
    const qrData = req.body.msg;
    const logoImagePath = "./logoimgr.png";


    // Generate the QR code
    generateQRCodeWithLogo(qrData, logoImagePath, (err, dataURI) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json({ qrCodeDataURI: dataURI });
        }
    });



    // Wrap code in an async function so we can use await
    async function generateQRCodeWithLogo(data, logoPath, callback) {
        // Generate the QR code
        const qrCode = await qr.toDataURL(data);

        // Load the logo image using Jimp
        const logo = await Jimp.read(logoPath);

        // Resize the logo to fit within the QR code
        logo.resize(35, 35); // Adjust the size as needed

        // Create a new Jimp image with the QR code
        const qrCodeImage = await Jimp.read(Buffer.from(qrCode.replace(/^data:image\/\w+;base64,/, ''), 'base64'));

        // Calculate the position to place the logo at the center of the QR code
        const x = (qrCodeImage.bitmap.width - logo.bitmap.width) / 2;
        const y = (qrCodeImage.bitmap.height - logo.bitmap.height) / 2;

        // Compose the QR code with the logo
        qrCodeImage.composite(logo, x, y);

        // Convert the composed image to a base64-encoded data URI
        const qrCodeWithLogoDataURI = await qrCodeImage.getBase64Async(Jimp.MIME_PNG);

        callback(null, qrCodeWithLogoDataURI);


        return qrCodeWithLogoDataURI;


    }
});


module.exports = router;
