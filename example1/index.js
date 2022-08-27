const express = require("express");

const app = express();
const path = require("path");
const http = require("http");

app.use("/", express.static("example1"));

app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const server = http.createServer(app);
const port = 8080;

server.listen(port);
