const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const imagereturn = require('./Controllers/GenerateQr');
const imagePteri = require('./Controllers/GenerateemptyQR');
// const mongoose= require('mongoose');
// require("dotenv").config();

// Enable CORS for all routes
app.use(cors());

// Enable cors for specific domain
// const corsOptions = {
//   origin: 'https://example.com', // Replace with the allowed origin
//   optionsSuccessStatus: 200, // Some legacy browsers choke on 204
// };

// app.use(cors(corsOptions));

app.use('/Generate', imagereturn);
app.use('/Generatepteri', imagePteri);

//const uri = "mongodb+srv://heywhyuserdb:Cyberwolf500@heywhydb.dypeniu.mongodb.net/?retryWrites=true&w=majority";

app.use(bodyParser.urlencoded({ extended: false }));

// HTTP GET request handler
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// HTTP POST request handler
app.post('/', (req, res) => {
  const body = req.body;
  res.send(`Received POST request with body: ${JSON.stringify(body)}`);
});

// async function connect(){
//  try {
//   await mongoose.connect(uri);
//   console.log('Database Connection success!');
//  } catch (error) {
//   console.error(error)
//  }
// }
// connect();

const port = 3002;

// Start the server
app.listen(port, () => {
 // console.log(`Server listening on port ${port}`);
 console.log(`Heywhy Your Qr Micro service is running Now!`);
});