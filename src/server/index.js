const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Aylien = require("aylien_textapi");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("dist"));
app.get("/", (req, res) => res.sendFile("dist/index.html"));

app.post("/article", (req, res) => {
  if (!req.body.text) {
    return res.status(400).json({
      message: "Invalid input",
    });
  }

  new Aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY,
  }).sentiment(
    {
      url: req.body.text,
    },
    function (error, response) {
      res.send(response);
    }
  );
});

app.listen(8080, function () {
  console.log("port is 8080");
});

// app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
