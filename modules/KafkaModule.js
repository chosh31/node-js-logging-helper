const config = require('../config/config');
// const sensor = `sensor-${Math.floor(Math.random() * 100000)}`;
const kafka = require('kafka-node');
const HighLevelProducer = kafka.HighLevelProducer;

module.exports = class KafkaModule {
    constructor(options) {
        this.options = options || config.kafka;
        this._client = new kafka.KafkaClient(this.options.client);
        this._admin = new kafka.Admin(this._client);
        this._producer = new HighLevelProducer(this._client);
    }

    writeRecord (record) {
        if (!this.options.enable) {
            return;
        }

        const payloads = [
            { topic: 'test-helper-topic-repl-3-test3', messages: 'hi' },
            { topic: 'test-helper-topic-repl-3-test3', messages: ['hello', 'world'] }
        ];

        this._producer.send(payloads, function (err, data) {
            if (err) {
                console.error(err);
                return;
            }
            console.log(data);
        });
    };
}