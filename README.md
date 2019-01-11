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
    - `options`
        - `required` (`kinesis` mode)
            - `enable`
            - `region`
            - `streamName`

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