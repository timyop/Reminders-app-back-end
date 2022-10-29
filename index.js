const express = require('express')
const ObjectId = require('mongodb').ObjectId
const createCollection = require('./db')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
const port = 4000

app.get('/reminders', async (req, res) => {
    const collection = await createCollection()
    const reminders = await collection.find({}).toArray()
    const responseBody = {
        success: true,
        message: 'Successfully retrieved reminders',
        data: {
            reminders: reminders
        }
    }
    res.status(200).json(responseBody)
})

app.post('/reminders', async (req, res) => {
    const collection = await createCollection()
    const newReminder = {
        title: req.body.title,
        done: req.body.done
    }
    await collection.insertOne(newReminder)
    const responseBody = {
        success: true,
        message: 'Successfully created reminder',
        data: {}
    }
    res.status(200).json(responseBody)
})

app.put('/reminders/:id', async (req, res) => {
    const collection = await createCollection()
    const reminderObjectId = ObjectId(req.params.id)
    const doneness = req.body.done
    await collection.updateOne({_id: reminderObjectId}, {$set: {done: doneness}})
    const responseBody = {
        success: true,
        message: 'Successfully set reminder as done',
        data: {}
    }
    res.status(200).json(responseBody)
})

app.delete('/reminders/:id', async (req, res) => {
    const collection = await createCollection()
    const reminderObjectId = ObjectId(req.params.id)
    await collection.deleteOne({_id: reminderObjectId})
    const responseBody = {
        success: true,
        message: 'Successfully deleted reminder',
        data: {}
    }
    res.status(200).json(responseBody)
})

app.listen(port)