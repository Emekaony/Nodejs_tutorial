const http = require("http");
const querystring = require("querystring");
const fs = require("fs");

const PORT = process.env.PORT || 1337;

function respondEcho(req, res) {
  // querystring is deprecated, but it works.
  // will adopt URLSearchParams at a later time
  console.log(req.url.split("?"));
  const { age = "", input = "" } = querystring.parse(
    req.url.split("?").slice(1).join("")
  );

  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      normal: input,
      shouty: input.toUpperCase(),
      characterCount: input.length,
      // reverse here actually alters the original input
      // but it is not a issue now because we will not use the original input elsewhere
      backwards: input.split("").reverse().join(""),
      age: age,
    })
  );
}

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

function respondStatic(req, res) {
  console.log(req.url.split("/static"));
  console.log(req.url);
  const filename = `${__dirname}/public${req.url.split("/static")[1]}`;
  fs.createReadStream(filename)
    .on("error", () => responseNotFound(req, res))
    .pipe(res);
}

const server = http.createServer(function (req, res) {
  if (req.url.match(/^\/echo/)) return respondEcho(req, res);
  if (req.url == "/") return respondText(req, res);
  if (req.url == "/json") return respondJson(req, res);
  if (req.url.match(/^\/static/)) return respondStatic(req, res);

  responseNotFound(req, res);
});

server.listen(PORT);
console.log(`Server listening on port ${PORT}`);
