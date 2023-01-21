const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const axios = require("axios");

const { readdirSync } = require("fs");
require("dotenv").config();

// app
const app = express();
var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

app.use(morgan("dev"));
app.use(express.json({ limit: "500mb" }));
app.use(
  express.urlencoded({ limit: "500mb", extended: true, parameterLimit: 500000 })
);
app.use(cors());
app.use(allowCrossDomain);

app.get("/api/insta-auth", async (req, res) => {
  try {
    const result = await axios.post(
      "https://api.instagram.com/oauth/access_token",
      req.body
    );
    res.json(result);
  } catch (error) {
    console.log(err.message);
  }
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server is listening on  the port ${port}`);
});
