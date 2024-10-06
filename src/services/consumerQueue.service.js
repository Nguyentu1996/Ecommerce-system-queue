'use strict'
const {
    consumerQueue,
    connectRabbitMQ,
} = require('../dbs/init.rabbitmq')

const messageService = {
    consumerToQueue: async (queueName) => {
        try {
            const { chanel, conn } = await connectRabbitMQ();
            await consumerQueue(chanel, queueName)

        } catch (error) {
            console.error(`Error consumer to queue:: ${error}`)
        }
    },
    // normal process
    consumerToQueueNormal: async () => {
        try {
            const { chanel, conn } = await connectRabbitMQ();
            const noticeQueue = 'noticeQueueProcess'
            // 1. TTL
            // const expired = 15000;
            // setTimeout(() => {
            //     chanel.consume(noticeQueue, msg => {
            //         console.log(`SEND notificationQueue success:: ${msg.content.toString()} `)
            //         chanel.ack(msg) // success process
            //     })
            // }, expired)

            chanel.consume(noticeQueue, msg => {
                try {
                    // console.log(`SEND notificationQueue success:: ${msg.content.toString()} `)
                    // chanel.ack(msg) // success process
                    throw Error('Process fail')

                } catch (error) {
                    console.log(`SEND notificationQueue error:: ${error} `);
                    chanel.nack(msg, false, false) // fail process
                }

            })
        } catch (error) {
            console.error(`Error consumer to notificationQueue:: ${error}`)
        }
    },
    // fail process
    consumerToQueueFailed: async () => {
        try {
            const { chanel, conn } = await connectRabbitMQ();
            const noticeExchangeDLX = 'noticeExDLX' // notice EX direct
            const noticeRoutingKeyDLX = 'noticeRoutingKeyExDLX' //assert
            const noticeQueueHandle = 'noticeQueueHotFix'
            await chanel.assertExchange(noticeExchangeDLX, 'direct', { durable: true })
            const queueResult = await chanel.assertQueue(noticeQueueHandle, {
                exclusive: false, // allow connect from other connection 
            });
             // bind queue
            await chanel.bindQueue(queueResult.queue, noticeExchangeDLX, noticeRoutingKeyDLX);

            await chanel.consume(queueResult.queue, msgFail => {
                console.log(`this notification error: pls hot fix:: ${msgFail.content.toString()} `)
            }, {
                noAck: true
            })

        } catch (error) {
            console.error(`Error:: ${error}`);
        }
    },

    consumerOrderedMessage: async () => {
        const { chanel, conn } = await connectRabbitMQ();
        const orderedQueue = 'ordered-message';
        // set prefetch
        chanel.prefetch(1); // ensure one ack at a time
        chanel.consume(orderedQueue, msg => {
            console.log(`SEND ordered message success:: ${msg.content.toString()} `);

            setTimeout(() => {
                console.log(`process: ${msg.content.toString()}`)
                chanel.ack(msg) // success process
            }, Math.random() * 1000)
        });
    }

}

module.exports = {
  ...messageService
} 