# TWITTER SENTIMENT TRENDER

Graph sentiment trends by topic on twitter and compare with other topics.

## Dependencies
+ https://www.npmjs.com/package/sentiment#usage-example
+ https://github.com/recharts/recharts
+ https://ant.design/
+ twitter v2 api
+ nyt search api

## Environment tokens 
- export TWITTER_BEARER_TOKEN=AAAAAAAAAAAAAAAAAAAAACBJLAEAAAAAsYzrnffYUjZ4NHzsMuviTuA1sSw%3Ds0Oy3ivaxaIlBiy6IhgZna50tXYKEQwa1kFXJL4SJ5b6sLWHoZ


- export NYT_TOKEN=dyI6Feqpgk60QDvWFRBQHUlW3BLSGKkT

## Server
GET /api/articles
Parameters
- date = YYYYmmdd
- q = "query string"

response = https://developer.nytimes.com/docs/articlesearch-product/1/routes/articlesearch.json/get

/api/searchSentiment/:query 
```json
{
    "2020-12-29T07:08:42.485Z" :{
        "meanSentiment": 0.23,
        "sentimentArray": [],
        "response": {
            // Same json format as the one below
        }
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