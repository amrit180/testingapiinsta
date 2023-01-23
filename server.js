const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const axios = require("axios");

const { readdirSync } = require("fs");
const { query } = require("express");
const { request } = require("request");

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

app.post("/api/insta-auth", function (req, res) {
  var options = {
    method: "POST",
    url: "https://api.instagram.com/oauth/access_token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    form: req.body,
  };

  request(options, function (error, response, body) {
    if (error) {
      console.log("error", error);
      throw new Error(error);
    }
    console.log(body);
    var data = JSON.parse(body);
    res.json(data);
  });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server is listening on  the port ${port}`);
});
