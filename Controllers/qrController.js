const qr = require('qrcode');

async function generateQRCode(data) {
  try {
    // Generate QR code as a data URL
    const qrDataUrl = await qr.toDataURL(data);
    return qrDataUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
}

module.exports = {
  generateQRCode,
};
