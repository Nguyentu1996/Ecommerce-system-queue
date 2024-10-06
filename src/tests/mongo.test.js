'use strict'

const mongoose = require('mongoose');
const connectionStr = 'mongodb://localhost:27017/shopDEV'

const testSchema = new mongoose.Schema({
    name: String
})
const Test = mongoose.model('Test', testSchema);

describe('Mongoose Connection', () => {
    let connection;

    beforeAll(
        async () => {
            connection = await mongoose.connect(connectionStr);
        }
    )
    
    // close connection to mongo
    afterAll(
        async () => {
            await connection.disconnect()
        }
    )

    it('should connect to successful Mongoose', async () => {
        expect(mongoose.connection.readyState).toBe(1);
    })

    it('should save a document to database', async () => {
        const user = new Test({ name: 'tuDev'});
        await user.save();
        expect(user.isNew).toBe(false);
    })

    it('should find a document to database', async () => {
        const user = await Test.findOne({ name: 'tuDev'});
        expect(user).toBeDefined();
        expect(user.name).toBe('tuDev');
    })
})
