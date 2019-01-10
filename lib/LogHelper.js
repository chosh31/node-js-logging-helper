const config = require('../config/config');
const kinesis = require('../modules/kinesis');

module.exports = class LogHelper {
    constructor() {
        this.mode = config.mode;
        return this;
    }

    setMode(mode) {
        this.mode = mode;
        return this;
    };

    getMode() {
        return this.mode;
    }
    
    log(msg) {
        const logMsg = `${this.mode}: ${msg}`;
        if (this.mode === 'kinesis') {
            kinesis.writeRecord(msg);
        }

        console.log(logMsg);
        return logMsg;
    }
}