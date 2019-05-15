const config = require('../config/config');
const Modules = require('../modules');

class LogHelper {
    constructor({mode = config.mode, options = config[this.mode]} = {}) {
        this.mode = mode;
        this.options = options;
        this.inst = new Modules[this.mode]();
        return this;
    }
    
    log(msg) {
        try {
            const dummyId = parseInt(Math.random() * 9999 + 1, 10);
            this.inst.writeRecord({
                id: dummyId,
                records: msg
            });
        } catch (e) {
            console.error(e);
        }
        return `${this.mode}: ${msg}`;
    }
}

module.exports = LogHelper;