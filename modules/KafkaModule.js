const config = require('../config/config');
// first configure the logger provider
const kafkaLogging = require('kafka-node/logging');
// const kafkaLogging = require('/Users/shcho/git/kafka-node/logging');
function consoleLoggerProvider (name) {
    // do something with the name
    return {
      debug: console.debug.bind(console),
      info: console.info.bind(console),
      warn: console.warn.bind(console),
      error: console.error.bind(console)
    };
  }
kafkaLogging.setLoggerProvider(consoleLoggerProvider);
const kafka = require('kafka-node');
const HighLevelProducer = kafka.HighLevelProducer;

module.exports = class KafkaModule {
    constructor(options = config.kafka) {
        this.options = options;
        this.setKafkaClient();
        this.setKafkaProducer();
        // this._admin = new kafka.Admin(this._client);
    }

    setKafkaClient (options = this.options.client) {
        this._client = new kafka.KafkaClient(options);
        this._client.refreshBrokerMetadata();
    }

    setKafkaProducer (client = this._client) {
        this._producer = new HighLevelProducer(client);
        this._producer.client.on('error', (error) => {
            console.log(`PRODUCER client :: error in!!!`);
            console.log(`error.name :: ${error.name}`);
        });
        this._producer.on('error', (error) => {
            console.log(`PRODUCER :: error in!!!`);
            console.log(`error.name :: ${error.name}`);

            if (error && error.name === "BrokerNotAvailableError") {
                console.log(`KAFKA-PRODUCER-REFRESH-METADATA-ERROR: ${error}`);
            }
            console.log(error);
            this._client = new kafka.KafkaClient(this.options.client);
            this._client.refreshMetadata([], () => {
                this._client.refreshBrokerMetadata();
            });
            this._producer = new HighLevelProducer(this._client);
            // this._admin = new kafka.Admin(this._client);
        });
    }

    getAdmin () {
        return this._admin;
    }

    getProducer () {
        return this._producer;
    }

    /**
     * @method writeRecord
     * @param {Array} records - `[{topic, messages}]`
     */
    writeRecord ({ id, records }, isError) {
        if (!this.options.enable) {
            return;
        }

        if (isError) {
            console.log('error occur!!');
            this._errorCount++;
            this.setKafkaClient();
            this.setKafkaProducer();
            // this._admin = new kafka.Admin(this._client);
            console.log(` -> retry id :: ${id}`);
            console.log(`retry logging data error count :: ${this._errorCount}`);
        } else {
            console.log(`log id :: ${id}`);
            this._errorCount = 0;
        }

        if (this._producer.client.ready) {
            this._sendLogs({ id, records });
        } else {
            this._producer.once('ready', () => {
                this._sendLogs({ id, records });
            });
        }
    };

    _sendLogs ({ id, records }) {
        this._producer.send(records, (err, data) => {
            if (err) {
                console.error(err);
                this._producer.close();
                this._client.close();
                this.writeRecord ({ id, records }, true);
                return;
            }
            console.log(data);
        });
    };
};