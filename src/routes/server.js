const ServerController = require('../app/controllers/ServerControllers');
const express = require('express');
const route = express.Router();

route.use('/show/:acc/:link',ServerController.showBook);
route.get('/show',ServerController.show);

module.exports = route