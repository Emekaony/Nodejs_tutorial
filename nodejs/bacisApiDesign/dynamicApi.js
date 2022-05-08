const http = require("http");
const querystring = require("querystring");

// local imports
const respondText = require("./utils/responses").respondText;
const respondJson = require("./utils/responses").respondJson;
const responseNotFound = require("./utils/responses").responseNotFound;

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

const server = http.createServer(function (req, res) {
  if (req.url.match(/^\/echo/)) return respondEcho(req, res);
  if (req.url == "/") return respondText(req, res);
  if (req.url == "/json") return respondJson(req, res);

  responseNotFound(req, res);
});

server.listen(PORT);
console.log(`Server listening on port ${PORT}`);
