const fs = require("fs");
const express = require("express");
const EventEmitter = require("events");

const chatEmitter = new EventEmitter();
const PORT = process.env.PORT || 1337;

const app = express();

app.get("/", respondText);
app.get("/json", respondJson);
app.get("/echo", respondEcho);
app.get("/static/*", respondStatic);
app.get("/chat", respondChat);
app.get("/sse", respondSSE);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

function respondEcho(req, res) {
  // querystring is deprecated, but it works.
  // will adopt URLSearchParams at a later time
  //   console.log(req.url.split("?"));
  //   const { age = "", input = "" } = querystring.parse(
  //     req.url.split("?").slice(1).join("")
  //   );

  //   res.setHeader("Content-Type", "application/json");
  //   res.end(
  //     JSON.stringify({
  //       normal: input,
  //       shouty: input.toUpperCase(),
  //       characterCount: input.length,
  //       // reverse here actually alters the original input
  //       // but it is not a issue now because we will not use the original input elsewhere
  //       backwards: input.split("").reverse().join(""),
  //       age: age,
  //     })
  //   );

  // using express:
  const { input = "", age = "" } = req.query;

  res.json({
    normal: input,
    shouty: input.toUpperCase(),
    characCount: input.length,
    backwards: input.split("").reverse().join(""),
    age: age,
  });
}

function respondText(req, res) {
  res.setHeader("Content-Type", "text/plain");
  res.end("Hey there, welcome to my website");
}

function respondJson(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.json({
    text: "Emeka",
    date: new Date(),
    id: 1234,
    cause: "I do not know",
  });
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
  const filename = `${__dirname}/public/${req.params[0]}`;
  fs.createReadStream(filename)
    .on("error", () => responseNotFound(req, res))
    .pipe(res);
}

function respondChat(req, res) {
  const { message } = req.query;

  chatEmitter.emit("message", message);
  res.end();
}

function respondSSE(req, res) {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
  });

  const onMessage = (msg) => res.write(`data: ${msg}\n\n`);
  chatEmitter.on("message", onMessage);

  res.on("close", function () {
    chatEmitter.off("message", onMessage);
  });
}

// const server = http.createServer(function (req, res) {
//   if (req.url.match(/^\/echo/)) return respondEcho(req, res);
//   if (req.url == "/") return respondText(req, res);
//   if (req.url == "/json") return respondJson(req, res);
//   if (req.url.match(/^\/static/)) return respondStatic(req, res);

//   responseNotFound(req, res);
// });
