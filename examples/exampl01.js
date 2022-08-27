var express = require("express");

var app = express();

app.get("/exampl01", (req, res) => {
  res.send(
    "<p>First name is: " +
      req.query["fname"] +
      "</p> <p>Last name is:" +
      req.query["lname"] +
      "</p> <p>Comments:" +
      req.query["comments"] +
      "</p>"
  );
});

app.listen(8080);
