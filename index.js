const express = require("express");
const app = express();

require("dotenv").config();

const portNo = process.env.PORT || 3000;

const test = "192.168.0.1";

const getAddress = {
  APIkey: "at_KcMC0GkoBIWgrY2WWAWXa09RpazKh",
  getData: async function getIPaddress() {
    const jsonData = `https://geo.ipify.org/api/v2/country,city?apiKey=${this.APIkey}&ipAddress=${this.IPinput.value}`;
    const response = await fetch(jsonData);
    const data = await response.json();
    return data;
  },
};

app.get("/address", (req, res) => {
  try {
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${getAddress.APIkey}&ipAddress=${test}`
    )
      .then((response) => response.json())
      .then((data) => res.json(data));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(portNo, () => {
  console.log(`Server running on http://127.0.0.1:${portNo}
for data, go to http://127.0.0.1:${portNo}/address`);
});
