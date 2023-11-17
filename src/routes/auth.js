const AuthController = require('../app/controllers/AuthControllers');
const express = require('express');
const route = express.Router();

route.post("/signUp",AuthController.signUp);
route.post("/preSignUp",AuthController.preSignUp);
route.post("/login",AuthController.login);
route.get("/loginForm",AuthController.getLogin);
route.get("/regisForm",AuthController.getRegis);
route.get("/logout",AuthController.logout);
route.post("/forgetPassword",AuthController.reGetPassword);

module.exports = route