## Express Winston Logger with stats
Setup to log requests as well as custom message at different log levels to console as well as to file with stats.

### Getting started
```shell
$ git clone git@github.com:arvindr21/express-winston-logger.git
$ cd express-winston-logger
$ npm install
$ node app.js
```
visit `http://localhost:3000`

Sample log file can be found at `express-winston-logger/log/application-*.log`. `log` folder is excluded from git. 
Sample output

```json
{"message":"Server is running on http://localhost:3000","level":"info"}
{"level":"info","message":"GET / 200 0ms","meta":{}}
{"level":"info","message":"GET / 200 1ms","meta":{}}
{"level":"info","message":"GET / 200 0ms","meta":{}}
{"level":"info","message":"GET / 200 0ms","meta":{}}
{"level":"info","message":"GET / 200 0ms","meta":{}}
{"level":"info","message":"GET / 200 0ms","meta":{}}
{"level":"info","message":"GET / 200 1ms","meta":{}}
{"level":"info","message":"GET / 200 0ms","meta":{}}
{"level":"info","message":"GET /fail 404 2ms","meta":{}}
{"level":"info","message":"GET /fail 404 1ms","meta":{}}
{"level":"info","message":"GET /stats 200 2ms","meta":{}}
```


#### View stats
You can visit `http://localhost:3000/stats` to view request response stats. 
Sample output

```json
{
    "uptime": 12217,
    "statusCodes":
    {
        "200": 8,
        "404": 2
    },
    "uuid": "7211ec59-1e29-4edc-94c0-4d6b560b618b",
    "pid": 19508,
    "totalTime": 4.548214,
    "averageTime": 0.4548214,
    "count": 10,
    "endpointStats":
    {
        "GET /":
        {
            "totalTime": 1.695694,
            "averageTime": 0.21196175,
            "count": 8,
            "statusCodes":
            {
                "200": 8
            }
        },
        "GET /fail":
        {
            "totalTime": 2.8525199999999997,
            "averageTime": 1.4262599999999999,
            "count": 2,
            "statusCodes":
            {
                "404": 2
            }
        }
    }
}
```