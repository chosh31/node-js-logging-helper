const config = require('../config/config');
const AWS = require('aws-sdk');
const sensor = `sensor-${Math.floor(Math.random() * 100000)}`;

let kinesis = new AWS.Kinesis({
    region: config.kinesis.region
});

kinesis.writeRecord = (record) => {
    if (!config.kinesis.enable) {
        return;
    }

    const recordData = {
        Data: record,
        PartitionKey: sensor,
        StreamName: config.kinesis.streamName
    }
   
    kinesis.putRecord(recordData, (err, data) => {
        if (err) {
            console.error('Kinesis: putRecord error!');
            console.error(err);
        } else {
            console.info('Kinesis: putRecord success');
            console.info(data);
        }
    });
};
 
module.exports = kinesis;
