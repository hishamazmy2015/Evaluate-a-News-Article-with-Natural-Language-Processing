// const userUrl = require("valid-url");
async function handleSubmit(event) {
  event.preventDefault();


  var urlAnalysis = document.getElementById('name').value;
  var validUrl = JSON.parse(JSON.stringify(urlAnalysis));
  // console.log("urlAnalysis ", urlAnalysis)
  if (Client.validURL(validUrl)) {
    const output = await fetch("http://localhost:8080/article", {
      method: "POST",
      credentials: "same-origin",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: urlAnalysis }),
    });
    const data = await output.json();
    // console.log("Data ...........................", data);
    if (data && output.status >= 200 && output.status < 400) {
      document.getElementById("polarity").innerHTML = data.polarity;
      document.getElementById("sc").innerHTML = data.subjectivity;
      document.getElementById("scon").innerHTML = data.polarity_confidence;
      document.getElementById("excerpt").innerHTML = data.subjectivity_confidence;
    }
    try {
      const data = await res.json();
    } catch (error) {
      document.getElementById('error').innerHTML = 'Something went wrong Please try again';
    }
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
