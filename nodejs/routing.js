const http = require("http");

const port = process.env.PORT || 1337;

function respondText(req, res) {
  res.setHeader("Content-Type", "text/plain");
  res.end("Hey there, welcome to my website");
}

function respondJson(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      text: "Emeka",
      obj: {
        date: new Date(),
        id: 1234,
        cause: "I do not know",
      },
    })
  );
}

function respondSalinha(req, res) {
  res.setHeader("Content-Type", "text/plain");
  res.end("What's up");
}

function responseNotFound(req, res) {
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found");
}

function careers_swe(req, res) {
  res.setHeader("Content-Type", "text/plain");
  res.end("You have been given the position of software engineer at stripe");
}

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
