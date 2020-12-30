# TWITTER SENTIMENT TRENDER

Graph sentiment trends by topic on twitter and compare with other topics.

## Server

/api/search/:query

returns 

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

or 

Error Msg