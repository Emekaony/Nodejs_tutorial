const http = require("http");

// import these modules from a util file to avoid port collision
const respondText = require("./utils/responses").respondText;
const respondJson = require("./utils/responses").respondJson;
const respondSalinha = require("./utils/responses").respondSalinha;
const responseNotFound = require("./utils/responses").responseNotFound;
const careers_swe = require("./utils/responses").careers_swe;

const port = process.env.PORT || 1337;

const server = http.createServer(function (req, res) {
  // use a switch statement to send response based on the url
  switch (req.url) {
    case "/":
      return respondText(req, res);
    case "/json":
      return respondJson(req, res);
    case "/salinha":
      return respondSalinha(req, res);
    case "/careers/swe":
      return careers_swe(req, res);
    default:
      responseNotFound(req, res);
  }
});

server.listen(port);
console.log(`Server is listening on port ${port}`);
