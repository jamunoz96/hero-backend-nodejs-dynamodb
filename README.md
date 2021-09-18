
# Hero back


### Instalation

- Install the dependencies:

```sh
npm install
```

- Start the development server
before configure .env for conexion to dynamoDB, when starting the app the db migrations will be executed


| ENVIRONMENT | VALUE |
| ------ | ------ |
| NODE_ENV | local|us-east-2 |
| DB_HOST | for local dynamoDB |


```sh
npm start
```

- Run tests

```sh
npm run test
```

# Demo
- deployed in aws with lambda functions
- https://6axt4zt89l.execute-api.us-east-2.amazonaws.com/dev/

# AWS serverless configuration
```sh
service: hero-serverless
frameworkVersion: '2'
useDotenv: true
provider:
  name: aws
  runtime: nodejs12.x
  region: us-east-2
  memorySize: 2048
  stage: dev
  timeout: 10
  lambdaHashingVersion: 20201221
package:
  patterns:
    - '!src/**'
    - '!test/**'
functions:
  api:
    handler: handler.api
    events:
      - http: ANY {proxy+}
      - http: ANY /
```



# Api documentation
- https://6axt4zt89l.execute-api.us-east-2.amazonaws.com/dev/api-docs/


## License

MIT

**Free Software, Hell Yeah!**
