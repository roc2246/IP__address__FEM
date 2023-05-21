const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

require("dotenv").config();

const portNo = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/address/:address", (req, res) => {
  try {
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.API_KEY}&ipAddress=${req.params.address}`
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
