const express = require("express");
const bodyParser = require("body-parser");
const util = require("util");
const request = require("request");
const path = require("path");
const socketIo = require("socket.io");
const http = require("http");

const app = express();
let port = process.env.PORT || 3000;
const post = util.promisify(request.post);
const get = util.promisify(request.get);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);
const io = socketIo(server);

const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;


const searchURL = new URL(
  "https://api.twitter.com/2/tweets/search/recent"
);

const errorMessage = {
  title: "Please Wait",
  detail: "Waiting for new Tweets to be posted...",
};

const authMessage = {
  title: "Could not authenticate",
  details: [
    `Please make sure your bearer token configured and correct.`,
  ],
  type: "https://developer.twitter.com/en/docs/authentication",
};


app.get("/api/search/:query", async (req, res) => {
  if (!BEARER_TOKEN) {
    res.status(400).send(authMessage);
  }

  const token = BEARER_TOKEN;

  var now = new Date();
  var start = new Date();
  var end = new Date();
  start.setDate(now.getDate()-5);
  end.setDate(now.getDate()-4);

  const requestConfig = {
    url: searchURL + "?query=" + req.params.query + "&end_time=" + end.toISOString() + "&start_time=" + start.toISOString() + "&tweet.fields=lang",
    auth: {
      bearer: token,
    },
    json: true,
  };

  try {
    const response = await get(requestConfig);

    if (response.statusCode !== 200) {
      if (response.statusCode === 403) {
        res.status(403).send(response.body);
      } else {
        throw new Error(response.body.error.message);
      }
    }

    res.send(response);
  } catch (e) {
    res.send(e);
  }
});


console.log("NODE_ENV is", process.env.NODE_ENV);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (request, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  port = 3001;
}

server.listen(port, () => console.log(`Listening on port ${port}`));