class KafkaProducerPool {
    constructor () {
        this._producerPool = [];
    }

    getProducerPool () {
        return this._producerPool;
    }

    releaseProducer (producer) {
        this._producerPool.push(producer);
    }
}

module.exports = KafkaProducerPool;