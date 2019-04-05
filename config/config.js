const config = module.exports = {
    mode: 'dev',
    kinesis: {
        enable: true,
        region: 'us-east-1',
        streamName: 'test-kinesis'
    },
    kafka: {
        enable: true,
        client: {
            kafkaHost: 'localhost:9092,localhost:9093,localhost:9094',
            connectTimeout: 10000,
            requestTimeout: 30000,
            autoConnect: true
        }
    }
};