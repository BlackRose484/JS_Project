const ServerController = require('../app/controllers/ServerControllers');
const express = require('express');
const route = express.Router();

route.get('/show',ServerController.show);

module.exports = route