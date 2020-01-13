const express = require('express');
const ChatService = require('./chat-service');

const chatRouter = express.Router()
const jsonBodyParser = express.json()

chatRouter
    .route('/')
    .get((req, res, next) => {
        res.send("hey its me")
    })
    .post(jsonBodyParser, (req, res, next) => {
        console.log(req.body)
        ChatService.sendMessage(req.body)
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(next)
    })

module.exports = chatRouter