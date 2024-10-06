'use strict'

const amqplib = require('amqplib');

const connectRabbitMQ = async () => {
    try {
        const amqplib_url = 'amqp://user:password@localhost:5672';
        const conn = await amqplib.connect(amqplib_url);

        if (!conn) throw new Error('connection not established')

        const chanel = await conn.createChannel()

        return { chanel, conn }
    } catch (error) {
        console.error(`Error:: ${error}`)
    }
}

const connectToRabbitMQForTest = async () => {
    try {
        const { chanel, conn } = await connectRabbitMQ();
        const queue = 'test-queue'
        const message = 'Hello, ShopDev'
        await chanel.assertQueue(queue);
        await chanel.sendToQueue(queue, Buffer.from(message))
        // close connection
        await conn.close();
    } catch (error) {
        console.error(`Error connection to RabbitMQ:: ${error}`)
    }
}

const consumerQueue = async (chanel, queueName) => {
    try {
        await chanel.assertQueue(queueName, { durable: true })
        console.log(`Waiting for message`);
        chanel.consume(queueName, msg => {
            console.log(`received message: ${msg.content.toString()}`)
        }, {
            noAck: true
        })
    } catch (error) {
        console.error(`Error publish message to RabbitMQ:: ${error}`)
    }
}
module.exports = {
    connectRabbitMQ,
    connectToRabbitMQForTest,
    consumerQueue,
}