var express = require("express");

var app = express();

//get method
app.get("/", (req, res) => {
  res.send("The get method was implemented");
});

// post method
app.post("/", (req, res) => {
  res.send("The post method was implemented");
});

//put method
app.put("/id", (req, res) => {
  res.send("THe put method was implemented");
});

//delete method
app.delete("/id", (req, res) => {
  res.send("The delete method was implemented");
});
app.listen("8080");
