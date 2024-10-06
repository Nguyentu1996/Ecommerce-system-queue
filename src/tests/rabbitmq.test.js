'use strict'

const { connectToRabbitMQForTest } = require('../dbs/init.rabbitmq')

describe('RabbitMQ Connection', () => {
    it('should connect to successful Rabbit MQ', async () => {
        const result = await connectToRabbitMQForTest();
        expect(result).toBeUndefined();
    })
})
