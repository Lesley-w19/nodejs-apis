var req = require("request");
req("http://www.google.com", (error, response, body) => {
  console.log(body);
});
