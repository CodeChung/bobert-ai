const express = require('express');
const ChatService = require('./chat-service');

const chatRouter = express.Router()
const jsonBodyParser = express.json()

chatRouter
    .route('/')
    .get((req, res, next) => {
        res.send("hey its me")
    })
    .post(async (req, res, next) => {
        const ids = req.body
        ChatService.getBlockSequence(req.app.get('db'), ids)
            .then(blocks => {
                return res.status(200).json(blocks)
            })
            .catch(next)
    })

module.exports = chatRouter