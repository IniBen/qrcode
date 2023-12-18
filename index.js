const express = require('express');
const bodyParser = require('body-parser');
const qrController = require('./Controllers/qrController');
const cors = require('cors');

const app = express();
const port = 3003;

app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// API endpoint for generating QR code
app.post('/generate', async (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({ error: 'Missing data parameter' });
  }

  try {
    // Use the controller to generate QR code
    const qrCode = await qrController.generateQRCode(data);

    res.json({ qrCode });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
