//the require - reads a JavaScript file, executes the file, and then proceeds to return the exports object
var http = require("http");

var server = http.createServer((req, res) => {
  var url = req.url;
  res.writeHead(200, {
    "Content-type": "text/html",
  });
  // res.end("Server for nodejs.");

  if (url === "/blog" && req.method === "GET") {
    write("Welcome to the Blog Page");
    res.end();
  } else if (url === "/about") {
    write("Welcome to the About Page");
    res.end();
  } else {
    write("Welcome to the Home Page");
    res.end();
  }
});

server.listen(8080);
