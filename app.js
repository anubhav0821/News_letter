const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const first_name = req.body.first;
  const last_name = req.body.last;
  const email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: first_name,
          LNAME: last_name,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us21.api.mailchimp.com/3.0/lists/460ce15ec9";

  const options = {
    method: "POST",
    auth: "anubhav:2c990e6bde6cccafbab7c6ea1d9b227a-us21",
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode == 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
  });

  request.write(jsonData);
  request.end();
});




app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});

// 2c990e6bde6cccafbab7c6ea1d9b227a-us21

// 460ce15ec9
