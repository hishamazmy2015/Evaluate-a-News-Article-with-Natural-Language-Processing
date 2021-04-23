const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
var FormData = require("form-data");
const fetch = require("node-fetch");

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
  
  const formdata = new FormData();
  // formdata.append("key", process.env.API_KEY);
  formdata.append("key", "23f9f16ffe60b3fc4598506a691652af");
  
  formdata.append("txt", req.body.text);
  formdata.append("lang", "en");

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };
  fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
    .then((response) => res.send(response.json()))
    .catch((error) => console.log("error", error));
});

/**
 *
 * Listen server port
 *
 */
app.listen(8080, function () {
  console.log("port is 8080");
});

// app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
