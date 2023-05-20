const express = require("express");
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')

require("dotenv").config();

const portNo = process.env.PORT || 3000;

const test = "192.168.0.1";

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));

const getAddress = {
  APIkey: process.env.API_KEY,
  getData: async function getIPaddress() {
    const jsonData = `https://geo.ipify.org/api/v2/country,city?apiKey=${this.APIkey}&ipAddress=${this.IPinput.value}`;
    const response = await fetch(jsonData);
    const data = await response.json();
    return data;
  },
};

app.get("/address/:address", (req, res) => {
  try {
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${getAddress.APIkey}&ipAddress=${req.params.address}`
    )
      .then((response) => response.json())
      .then((data) => res.json(data));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(portNo, () => {
  console.log(`Server running on http://127.0.0.1:${portNo}`);
});
