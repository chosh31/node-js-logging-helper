const config = require('../config/config');
const Modules = require('../modules');

module.exports = class LogHelper {
    constructor({mode, options}) {
        this.mode = mode || config.mode;
        this.options = options || config[this.mode];
        return this;
    }
    
    log(msg) {
        new Modules[this.mode]().writeRecord(msg);
        return `${this.mode}: ${msg}`;
    }
}