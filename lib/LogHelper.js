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
        if (this.mode === 'kinesis') {
            console.log(`kinesis: ${msg}`);
            kinesis.writeRecord(msg);
            return `kinesis: ${msg}`;
        } else {
            console.log(msg);
            return `console: ${msg}`;
        }
    }
}