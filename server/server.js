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
const NYT_TOKEN = process.env.NYT_TOKEN;


const searchURL = new URL(
  "https://api.twitter.com/2/tweets/search/recent"
);

const nytURL = new URL (
  "https://api.nytimes.com/svc/search/v2/articlesearch.json"
);

const errorMessage = {
  title: "Please Wait",
  detail: "Waiting for new Tweets to be posted...",
};

const authMessage = {
  title: "Could not authenticate",
  details: [
    `Please make sure your bearer tokens are configured and correct.`,
  ],
  type: "https://developer.twitter.com/en/docs/authentication",
};

const isEng = (data) => {
  return data.lang === "en";
}

const average = (array) => {
  return array.reduce((a, b) => a + b) / array.length;
}

const readableDate = (dateObj) => {
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();
  return month + "/" + day + "/" + year;
}

const asyncOperation = ([startDate, url]) => {
  console.log("calling ------ ", startDate)
  return [startDate, get(url)]
};

const createListOfArguments = (query) => {
  const listOfArguments = [];

  const token = BEARER_TOKEN;
  const url = searchURL + "?query=" + query + "&tweet.fields=lang" + "&max_results=100" 

  var startTime = new Date();
  var endTime = new Date();
  var count = 0; 

  while (count < 7) {
    startTime.setDate(endTime.getDate()-1);
    let startTimeString = startTime.toISOString();
    let readableStartTime = readableDate(startTime);

    if (count === 0) {

      const requestConfig = {
        url: url + "&start_time=" + startTimeString,
        auth: {
          bearer: token,
        },
        json: true,
      };

      listOfArguments.push([readableStartTime, requestConfig]);

    } else {

      const requestConfig = {
        url: url + "&start_time=" + startTimeString + '&end_time=' + endTime.toISOString(),
        auth: {
          bearer: token,
        },
        json: true,
      };

      listOfArguments.push([readableStartTime, requestConfig]);

    }

    endTime = new Date(startTimeString);
    count++;

  }

  return listOfArguments;
}

// concurrent twitter requests
// response = {date: meanSentiment, date: meanSentiment ....}
app.get("/api/searchSentiment/:query", async (req, res) => {
  console.log("It has begun!!")

  if (!BEARER_TOKEN) {
    return res.status(400).send(authMessage);
  }

  var Sentiment = require('sentiment');
  var sentiment = new Sentiment();

  const listOfArguments = createListOfArguments(req.params.query);
  console.log("List of arguements:    ", listOfArguments);

  const listOfPromises = listOfArguments.map(asyncOperation);

  const results = {};
  for (const promise of listOfPromises) {
    try {
      let [date, p] = promise;
      let response = await p;
      //let response = await promise;
  
      if (response.statusCode !== 200) {
        if (response.statusCode === 403) {
          console.log("ERROR DUMPLING ===== ", response.body);
          return res.status(403).send(response.body);
        } else {
          throw new Error(response.body.error.message);
        }
      }

      let textArray = response.body.data.filter(isEng).map(({ text }) => text);
      let sentimentArray = textArray.map(tweet => sentiment.analyze(tweet).score);
      let meanSentiment = average(sentimentArray);

        // let summary = {
        //   "meanSentiment": meanSentiment,
        //   "sentimentArray": sentimentArray,
        //   "response": response
        // }

      //results.push(meanSentiment);
      results[date] = meanSentiment;
      console.log("Current Results ============    ", results)

    } catch (e) {
      console.log("ERROR PONYO ===== ", e);
      return res.status(500).send(e);
    }
  }

  return res.send(results);

});


// Add paramters to change api returns
// TODO: error message not being sent
app.get("/api/ss/:query", async (req, res) => {
  if (!BEARER_TOKEN) {
     return res.status(400).send(authMessage);
  }

  const token = BEARER_TOKEN;
  const url = searchURL + "?query=" + req.params.query + "&tweet.fields=lang" + "&max_results=100" 

  var finalResponse = {}

  var Sentiment = require('sentiment');
  var sentiment = new Sentiment();

  var startTime = new Date();
  var endTime = new Date();
  var count = 0; 

  while (count < 7) {


    console.log("COUNT -----------------------", count);

    startTime.setDate(endTime.getDate()-1);
    let startTimeString = startTime.toISOString();
    let readableStartTime = readableDate(startTime);

    console.log("START TIME ~~~~~~~~~~~~~~~~~~", startTime)
    console.log("END TIME ~~~~~~~~~~~~~~~~~~~~", endTime)

    
    if (count === 0) {

      const requestConfig = {
        url: url + "&start_time=" + startTimeString,
        auth: {
          bearer: token,
        },
        json: true,
      };
    
      try {
        const response = await get(requestConfig);
    
        if (response.statusCode !== 200) {
          if (response.statusCode === 403) {
            console.log("ERROR DUMPLING ===== ", response.body);
            return res.status(403).send(response.body);
          } else {
            throw new Error(response.body.error.message);
          }
        }
  
        let textArray = response.body.data.filter(isEng).map(({ text }) => text);
        let sentimentArray = textArray.map(tweet => sentiment.analyze(tweet).score);
        let meanSentiment = average(sentimentArray);

        // let summary = {
        //   "meanSentiment": meanSentiment,
        //   "sentimentArray": sentimentArray,
        //   "response": response
        // }
    
        finalResponse[readableStartTime] = meanSentiment;

      } catch (e) {
        console.log("ERROR PONYO ===== ", e);
        return res.status(500).send(e);
      }

    } else {

      const requestConfig = {
        url: url + "&start_time=" + startTimeString + '&end_time=' + endTime.toISOString(),
        auth: {
          bearer: token,
        },
        json: true,
      };
    
      try {
        const response = await get(requestConfig);
    
        if (response.statusCode !== 200) {
          if (response.statusCode === 403) {
            console.log("ERROR BEAN ====== ", response.body);
            return res.status(403).send(response.body);
          } else {
            console.log("THE EROOR *******************", response.body.error.message)
            throw new Error(response.body.error.message);
          }
        }
    
        let textArray = response.body.data.filter(isEng).map(({ text }) => text);
        let sentimentArray = textArray.map(tweet => sentiment.analyze(tweet).score);
        let meanSentiment = average(sentimentArray);

        // let summary = {
        //   "meanSentiment": meanSentiment,
        //   "sentimentArray": sentimentArray,
        //   "response": response
        // }
    
        finalResponse[readableStartTime] = meanSentiment;

      } catch (e) {
        console.log("ERROR BUBS ===== ", e);
        return res.status(500).send(e);
      }

    }

    endTime = new Date(startTimeString);
    count++;
  }

  return res.send(finalResponse);

});

app.get("/api/search/:query", async (req, res) => {
  if (!BEARER_TOKEN) {
    res.status(400).send(authMessage);
  }

  const token = BEARER_TOKEN;
  const url = searchURL + "?query=" + req.params.query + "&tweet.fields=lang"

  var finalResponse = {}

  var startTime = new Date();
  var endTime = new Date();
  var count = 0; 

  while (count < 7) {


    console.log("COUNT -----------------------", count);

    startTime.setDate(endTime.getDate()-1)
    var startTimeString = startTime.toISOString()

    console.log("START TIME ~~~~~~~~~~~~~~~~~~", startTime)
    console.log("END TIME ~~~~~~~~~~~~~~~~~~~~", endTime)

    
    if (count === 0) {

      const requestConfig = {
        url: url + "&start_time=" + startTimeString,
        auth: {
          bearer: token,
        },
        json: true,
      };
    
      try {
        const response = await get(requestConfig);
    
        if (response.statusCode !== 200) {
          if (response.statusCode === 403) {
            console.log("ERROR DUMPLING");
            return res.status(403).send(response.body);
          } else {
            throw new Error(response.body.error.message);
          }
        }
  
        finalResponse[startTimeString] = response;

      } catch (e) {
        console.log("ERROR PONYO");
        return res.send(e);
      }

    } else {

      const requestConfig = {
        url: url + "&start_time=" + startTimeString + '&end_time=' + endTime.toISOString(),
        auth: {
          bearer: token,
        },
        json: true,
      };
    
      try {
        const response = await get(requestConfig);
    
        if (response.statusCode !== 200) {
          if (response.statusCode === 403) {
            console.log("ERROR BEAN");
            return res.status(403).send(response.body);
          } else {
            console.log("THE EROOR *******************", response.body.error.message)
            throw new Error(response.body.error.message);
          }
        }
    
        finalResponse[startTimeString] = response;

      } catch (e) {
        console.log("ERROR BUBS");
        return res.send(e);
      }

    }

    endTime = new Date(startTimeString);
    count++;
  }

  return res.send(finalResponse);

});

app.get("/api/sentiment/:tweet", async (req, res) => {
  var Sentiment = require('sentiment');
  var sentiment = new Sentiment();
  var result = sentiment.analyze(req.params.tweet);
  res.send({"sentiment": result.score});   
});


// TWO PARAMETERS 1. date 2. q
app.get("/api/articles", async (req, res) => {

  console.log("YAY! - ARTICLES IN COMINGGGGG");

  if (!NYT_TOKEN) {
    console.log("BEANERS");
    return res.status(400).send(authMessage);
  }

  const key = NYT_TOKEN;

  const date = req.query.date;
  const query = req.query.q;

  const url = nytURL + "?api-key=" + key + "&sort=relevance&begin_date=" + date
                     + "&end_date=" + date + "&q=" + query;

  const requestConfig = {
    url: url + "&q=election",
    json: true
  };

  try {
    const response = await get(requestConfig);

    if (response.statusCode !== 200) {
      if (response.statusCode === 403) {
        console.log("ERROR DUMPLING ===== ", response.body);
        res.status(403).send(response.body);
      } else {
        throw new Error(response.body.error.message);
      }
    }

    return res.send(response);

  } catch (e) {
    console.log("ERROR PONYO ===== ", e);
    return res.status(500).send(e);
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