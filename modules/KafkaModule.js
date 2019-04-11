const config = require('../config/config');
const kafka = require('kafka-node');
const KafkaProducerPool = require('./KafkaProducerPool');
const HighLevelProducer = kafka.HighLevelProducer;
const producerPool = new KafkaProducerPool();

module.exports = class KafkaModule {
    constructor(options) {
        this.options = options || config.kafka;
    }

    getAdmin () {
        if (this._admin === undefined) {
            this._admin = new kafka.Admin(
                new kafka.KafkaClient(this.options.client)
            )
        }
        return this._admin;
    }

    getProducer () {
        if (producerPool.getProducerPool().length === 0) {
            producerPool.getProducerPool().push(
                new HighLevelProducer(
                    new kafka.KafkaClient(this.options.client)
                )
            );
        }
        return producerPool.getProducerPool().shift();
    }

    /**
     * @method writeRecord
     * @param {Array} records - `[{topic, messages}]`
     */
    writeRecord (records) {
        if (!this.options.enable) {
            return;
        }
        this._producer = this.getProducer();

        this._producer.send(records, (err, data) => {
            producerPool.releaseProducer(this._producer);
            if (err) {
                console.error(err);
                return;
            }
            console.log(data);
        });
    };
};