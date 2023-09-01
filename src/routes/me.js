const MeController = require('../app/controllers/MeController');
const express = require('express');
const route = express.Router();

route.get('/postForm',MeController.postForm);
route.post('/postBook',MeController.postBook);
route.post('/addFavour',MeController.addFavourBook);
route.post('/removeFavour',MeController.removeFavourBook);
route.get('/:slug',MeController.favourBook);

module.exports = route;