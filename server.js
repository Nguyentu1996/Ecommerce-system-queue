'use strict'

const { consumerToQueue, consumerToQueueFailed, consumerToQueueNormal, consumerOrderedMessage } = require('./src/services/consumerQueue.service')

// const queueName = 'tasks'
// consumerToQueue(queueName).then(() => {
//     console.log(`Message Consumer started:: ${queueName}`)
// }).catch((error) =>
//     console.error(`Message Consumer Error:: ${error}`)
// )

// consumerToQueueFailed().then(() => {
//     console.log(`Message Consumer Fail Started`)
// }).catch((error) =>
//     console.error(`Message Consumer Fail Error:: ${error}`)
// )

// consumerToQueueNormal().then(() => {
//     console.log(`Message Consumer Normal Started`)
// }).catch((error) =>
//     console.error(`Message Consumer Normal Error:: ${error}`)
// )

consumerOrderedMessage().then(() => {
    console.log(`Message Consumer Ordered Message Started`)
}).catch((error) =>
    console.error(`Message Consumer Ordered Message Error:: ${error}`)
)

