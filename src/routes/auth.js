const AuthController = require('../app/controllers/AuthControllers');
const express = require('express');
const route = express.Router();

route.post("/signUp",AuthController.signUp);
route.post("/login",AuthController.login);
route.get("/loginForm",AuthController.getLogin);
route.get("/regisForm",AuthController.getRegis);
route.get("/logout",AuthController.logout)

module.exports = route