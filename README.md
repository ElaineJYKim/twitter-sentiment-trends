# TWITTER SENTIMENT TRENDER

Graph sentiment trends by topic on twitter and compare with other topics.

1. Pull relavent tweets from twitter
2. Conduct Sentiment analysis on the tweets and average sentiments per day.
3. Visualize the sentiment flow
4. Click on different data points to see New York Times headlines relavent to the topic on the given day.

## Run application
1. clone repo
2. set environment variables
```
export TWITTER_BEARER_TOKEN=AAAAAAAAAAAAAAAAAAAAACBJLAEAAAAAsYzrnffYUjZ4NHzsMuviTuA1sSw%3Ds0Oy3ivaxaIlBiy6IhgZna50tXYKEQwa1kFXJL4SJ5b6sLWHoZ

export NYT_TOKEN=dyI6Feqpgk60QDvWFRBQHUlW3BLSGKkT
```
3. `npm run development`

## Dependencies
+ https://www.npmjs.com/package/sentiment#usage-example
+ https://github.com/recharts/recharts
+ https://ant.design/
+ twitter v2 api
+ nyt search api

## Environment tokens 
- export TWITTER_BEARER_TOKEN=AAAAAAAAAAAAAAAAAAAAACBJLAEAAAAAsYzrnffYUjZ4NHzsMuviTuA1sSw%3Ds0Oy3ivaxaIlBiy6IhgZna50tXYKEQwa1kFXJL4SJ5b6sLWHoZ

- export NYT_TOKEN=dyI6Feqpgk60QDvWFRBQHUlW3BLSGKkT

## Future Development
1. Pull articles for entertainment/etc topics: currently pulling article reerences strictly from NYT restricts users to "serious news"
2. UI improvements: still not satisfactory
3. Refactor code a little so no change needs to be implemented if gain access to premium version of twitter api (currently restricted to 7 days of data)
4. Handle and search for other languages besides English 

## Server
GET /api/articles
Parameters
- date = YYYYmmdd
- q = "query string"

response = https://developer.nytimes.com/docs/articlesearch-product/1/routes/articlesearch.json/get

/api/searchSentiment/:query 
ex) /api/searchSentiment/trump
```json
{
    "1/12/2021":-1.173913043478261,
    "1/11/2021":-0.5194805194805194,
    "1/10/2021":-1.5222222222222221,
    "1/9/2021":-1.355263157894737,
    "1/8/2021":-1.4078947368421053,
    "1/7/2021":-0.676056338028169,
    "1/6/2021":-0.9722222222222222
}
```

/api/search/:query 

```json
{
    "2020-12-29T07:08:42.485Z" :{
        "statusCode": 200,
        "body":{
            "data":[
                {
                    "id": "1279991360007929856",
                    "lang": "en",
                    "text": "RT @the_yellow_fall: steady v3.1.13 releases: Discover, assess and mitigate known vulnerabilities in your Java and Python projects https://…"
                },
                {},
                {},
            ],
            "meta":{}
        },
        "headers":{},
        "request":{}
    },
    "2020-12-28T07:08:42.485Z" :{},
    "2020-12-27T07:08:42.485Z" :{},
    "2020-12-26T07:08:42.485Z" :{},
    "2020-12-25T07:08:42.485Z" :{},
    "2020-12-24T07:08:42.485Z" :{},
    "2020-12-23T07:08:42.485Z" :{}
}
```

/api/sentiment/:text
```json
{
    "sentiment": 3
}
``` 


or 

Error Msg