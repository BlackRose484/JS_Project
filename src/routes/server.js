const ServerController = require('../app/controllers/ServerControllers');
const express = require('express');
const {Protect,CheckUser} = require('../app/middlewares/AuthMiddleware');
const route = express.Router();

route.get('/show//:link',Protect,ServerController.showBook)
route.use('/show/:acc/:link',ServerController.showBook);
route.get('/showPdfFile/:acc/:link',ServerController.showFilePdf);
route.get('/showPdf',ServerController.showPdf);
route.get('/show',ServerController.show);

module.exports = route