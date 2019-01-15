const config = require('../config/config');
const Modules = require('../modules');

module.exports = class LogHelper {
    constructor({mode = config.mode, options = config[this.mode]} = {}) {
        this.mode = mode;
        this.options = options;
        this.inst = new Modules[this.mode]();
        return this;
    }
    
    log(msg) {
        this.inst.writeRecord(msg);
        return `${this.mode}: ${msg}`;
    }
}