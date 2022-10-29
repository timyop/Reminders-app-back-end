const {MongoClient} = require('mongodb')
const url = 'mongodb://root:password@localhost:27017'

const createCollection = async () => {
    const connection = await MongoClient.connect(url)
    const collection = connection.db('remindersDb').collection('reminders')
    return collection
}

module.exports = createCollection