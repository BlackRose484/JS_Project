const ChatController = require("../app/controllers/ChatControllers");
const express = require('express');
const route = express.Router();

route.get('/chatRoom',ChatController.chatRoom);

module.exports = route;