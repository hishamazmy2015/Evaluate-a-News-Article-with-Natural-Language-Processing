// const userUrl = require("valid-url");
function handleSubmit(event) {
  event.preventDefault();

  var urlAnalysis = document.querySelectorAll("input[name=dataURL]");

  var validUrl = JSON.parse(JSON.stringify(urlAnalysis[0].value));

  if (Client.validURL(validUrl)) {
    fetch("http://localhost:8080/article", {
      method: "POST",
      credentials: "same-origin",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: urlAnalysis[0].value }),
    })
      .then((res) => res.json())
      .then(function (res) {
        document.querySelector("section.results #polarity").innerHTML =
          res.polarity;
        document.querySelector("section.results #sc").innerHTML =
          res.subjectivity;
        document.querySelector("section.results #pc").innerHTML =
          res.polarity_confidence;
        document.querySelector("section.results #scon").innerHTML =
          res.subjectivity_confidence;
        document.querySelector("section.results #excerpt").innerHTML = res.text;
      });
  } else {
    document.getElementById("errors").innerHTML =
      "URL is wrong try again with valid one !!! ";
  }
}

/**
 *
 * Fetch  Article
 *
 */

module.exports = handleSubmit;
