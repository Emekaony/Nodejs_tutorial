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

module.exports = {
  responseNotFound,
  respondJson,
  respondText,
  respondSalinha,
  careers_swe,
};
