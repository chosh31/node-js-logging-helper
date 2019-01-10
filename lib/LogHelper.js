const config = require('../config/config');
const Modules = require('../modules');

module.exports = class LogHelper {
    constructor({mode = config.mode, options = config[this.mode]}) {
        this.mode = mode;
        this.options = options;
        return this;
    }
    
    log(msg) {
        new Modules[this.mode]().writeRecord(msg);
        return `${this.mode}: ${msg}`;
    }
}