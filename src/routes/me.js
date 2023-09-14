const MeController = require('../app/controllers/MeController');
const express = require('express');
const route = express.Router();

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname,'..','public','pdf'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
  });

const upload = multer({storage});

route.get('/postForm',MeController.postForm);
route.get('/uploadForm',MeController.uploadForm);
route.post('/postBook',MeController.postBook);
route.post('/uploads',upload.single('pdfFile'),MeController.uploadPdf);
route.post('/addFavour',MeController.addFavourBook);
route.post('/removeFavour',MeController.removeFavourBook);
route.post('/addFavourPdf',MeController.addFavourPdf);
route.post('/removeFavourPdf',MeController.removeFavourPdf);
route.post('/like',MeController.likeBook);
route.post('/dislike',MeController.disLikeBook);

route.post('/likePdf',MeController.likePdf);
route.post('/dislikePdf',MeController.disLikePdf);

route.get('/PdfFavour/:slug',MeController.favourPdf);
route.get('/:slug',MeController.favourBook);

module.exports = route;