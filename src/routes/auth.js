const AuthController = require('../app/controllers/AuthControllers');
const express = require('express');
const route = express.Router();

route.post("/signUp",AuthController.signUp);

module.exports = route