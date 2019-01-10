const assert = require('assert');
const LogHelper = require('../lib/LogHelper.js');

describe('LogHelper test', () => {
    describe('logging mode test', () => {
        it('console mode', () => {
            const testStr = 'weewagaewtew';
            const logHelper = new LogHelper();
            assert.equal(logHelper.setMode('console').log(testStr), `console: ${testStr}`);
        });

        it('kinesis mode', () => {
            const testStr = 'weewagaewtew';
            const logHelper = new LogHelper();
            assert.equal(logHelper.setMode('kinesis').log(testStr), `kinesis: ${testStr}`);
        });
    });
});