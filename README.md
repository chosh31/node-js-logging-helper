# Logging Helper for Node.js

### Packages
```
$ npm i --save-dev node-js-logging-helper
```

### Configuration
- `LogHelper`
    - `mode`
        - `dev`
        - `kinesis`
        - `kafka`
    - `options`
        - `required` (`kinesis` / `kafka` mode)
            - `kinesis`
                - `enable`
                - `region`
                - `streamName`
            - `kafka`
                - `enable`
                - `client`
                    - `kafka options`
                    ```
                    {
                        kafkaHost: 'localhost:9092,localhost:9093,localhost:9094',
                        connectTimeout: 10000,
                        requestTimeout: 30000,
                        autoConnect: true
                    }
                    ```

### Example
- mode: `dev`
```js
const LogHelper = require('node-js-logging-helper');
const logHepler = new LogHelper({
    mode: 'dev'
});
logHepler.log('aaa');
```

- mode: `kinesis`
```js
const LogHelper = require('node-js-logging-helper');
const logHepler = new LogHelper({
    mode: 'kinesis',
    options: {
        enable: true,
        region: 'us-east-1',
        streamName: 'test-kinesis'
    }
});
logHepler.log('aaa');
```

- mode: `kafka`
```js
const LogHelper = require('node-js-logging-helper');
const logHepler = new LogHelper({
    mode: 'kafka',
    options: {
        enable: true,
        client: {
            kafkaHost: 'localhost:9092,localhost:9093,localhost:9094',
            connectTimeout: 10000,
            requestTimeout: 30000,
            autoConnect: true
        }
    }
});
logHepler.log('aaa');
```