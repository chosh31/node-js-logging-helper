const config = require('../config/config');
const AWS = require('aws-sdk');
const sensor = `sensor-${Math.floor(Math.random() * 100000)}`;

module.exports = class KinesisModule {
    constructor(options) {
        this.options = options || config.kinesis;
        this._kinesis = new AWS.Kinesis({
            region: this.options.region
        });
    }

    writeRecord (record) {
        if (!this.options.enable) {
            return;
        }
    
        const recordData = {
            Data: record,
            PartitionKey: sensor,
            StreamName: this.options.streamName
        }
       
        this._kinesis.putRecord(recordData, (err, data) => {
            if (err) {
                console.error('Kinesis: putRecord error!');
                console.error(err);
            } else {
                console.info('Kinesis: putRecord success');
                console.info(data);
            }
        });
    };
}
