const assert = require('assert');
const LogHelper = require('../lib/LogHelper.js');

describe('LogHelper test', () => {
    describe('logging mode test', () => {
        it('console mode', () => {
            const mode = 'console';
            const testStr = 'console test msg';
            const logHelper = new LogHelper();
            assert.equal(logHelper.setMode(mode).log(testStr), `${mode}: ${testStr}`);
        });
        
        it('kinesis mode', () => {
            const mode = 'kinesis';
            const testStr = 'kinesis test msg';
            const logHelper = new LogHelper();
            assert.equal(logHelper.setMode(mode).log(testStr), `${mode}: ${testStr}`);
        });
    });
});