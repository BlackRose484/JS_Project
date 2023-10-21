const Books = require('../models/books');
const Users = require('../models/users');
const Pdfs = require('../models/pdfs');
const fs = require('fs');

function HandleErr(err){
    const errors = {link:""};
    if(err.code===11000)
    {
        errors.link = "Oh no, the book is exist";
        return errors;
    }
}

class MeController{
    postForm(req,res,next)
    {
        res.render('me/create');
    }
    async postBook(req,res,next)
    {
        const {acc,nameBook,linkBook,desBook} = req.body;

        try{
            const newBook = await Books.create({nameBook,linkBook,desBook});
            const userOfBook = await Users.findOne({acc:acc}).lean();
            if(userOfBook)
            {
                const favour = userOfBook.favour+ linkBook+'/';
                await Users.findOneAndUpdate({acc:acc},{favour:favour});
                res.status(200).json({acc});
            }
            else res.status(404).json({err:"Loi acc"})
        }
        catch(errors)
        {
            const error = HandleErr(errors);
            res.status(404).json({error});
        }
    }

    uploadForm(req,res,next){
        res.render('me/uploadPdf');
    }

    async uploadPdf(req,res,next){
        const uploadedFile = req.file;
        if (!uploadedFile) {
            return res.status(400).send('No file uploaded.');
        }

        const PdfData = {
            filename:req.file.filename,
            title: req.body.title,
            author: req.body.author,
            pdfPath: uploadedFile.path,
            desPdf: req.body.desBook
        };

        const user = req.body.user;

        try {
            const newPdf = await Pdfs.create(PdfData);
            const userOfBook = await Users.findOne({acc:user}).lean();
            if(userOfBook)
            {
                const favour = userOfBook.favour+ req.file.filename+'/';
                await Users.findOneAndUpdate({acc:user},{favour:favour});
            }
            else res.status(404).json({err:"Loi acc"})
            res.redirect('/');
        } catch (error) {
            console.log(error)
        }
    }

    async favourBook(req,res,next){
        const acc = req.params.slug;
        const curUser = await Users.findOne({acc:acc}).lean();

        if(curUser.favour)
        {
            const bookLike = curUser.favour.split('/');
            let BookLike =[];
            for(let book of bookLike)
            {
                const Book = await Books.findOne({linkBook:book}).lean();
                if(Book)BookLike.push(Book);
            }
            res.render('me/favour',{BookLike});
        }
        else res.render('me/favour');
    }

    async favourPdf(req,res,next){
        const acc = req.params.slug;
        const curUser = await Users.findOne({acc:acc}).lean();

        if(curUser.favour)
        {
            const PdfFavour = curUser.favour.split('/');
            let PdfLike = [];
            for(let pdf of PdfFavour)
            {
                if(pdf.includes('.pdf'))
                {
                    const pdfVal = await Pdfs.findOne({filename:pdf}).lean();
                    if(pdfVal) PdfLike.push(pdfVal);
                }
            }
            res.render('me/favourPdf',{PdfLike});
        }
        else res.render('me/favourPdf');
    }

    async addFavourBook(req,res,next){
        const {acc,linkBook} = req.body;
        try{
            const curUser = await Users.findOne({acc}).lean();
            const curBook = await Books.findOne({linkBook}).lean();
            let follow = curBook.follow;
            if(!follow)
            {
                follow = 1;
            }
            else follow++;
            let favour = curUser.favour;
            favour+=linkBook+'/';
            await Users.findOneAndUpdate({acc:acc},{favour:favour});
            await Books.findOneAndUpdate({linkBook:linkBook},{follow:follow});
            res.status(200).json({acc});
        }
        catch(err)
        {

        }
    }

    async addFavourPdf(req,res,next){
        const {acc,linkPdf} = req.body;
        try{
            const curUser = await Users.findOne({acc}).lean();
            const curPdf = await Pdfs.findOne({linkPdf}).lean();
            let follow = curPdf.follow;
            if(!follow)
            {
                follow = 1;
            }
            else follow++;
            let favour = curUser.favour;
            favour+=linkPdf+'/';
            await Users.findOneAndUpdate({acc:acc},{favour:favour});
            await Pdfs.findOneAndUpdate({filename:linkPdf},{follow:follow});
            res.status(200).json({acc});
        }
        catch(err)
        {

        }
    }

    async addFavourPdf(req,res,next){
        const {acc,linkPdf} = req.body;
        try{
            const curUser = await Users.findOne({acc}).lean();
            const curPdf = await Pdfs.findOne({filename:linkPdf}).lean();
            let follow = curPdf.follow;
            if(!follow)
            {
                follow = 1;
            }
            else follow++;
            let favour = curUser.favour;
            favour+=linkPdf+'/';
            await Users.findOneAndUpdate({acc:acc},{favour:favour});
            await Pdfs.findOneAndUpdate({filename:linkPdf},{follow:follow});
            res.status(200).json({acc});
        }
        catch(err)
        {

        }
    }

    async removeFavourBook(req,res,next){
        const {acc,linkBook} = req.body;
        try{
            const curUser = await Users.findOne({acc}).lean();
            const curBook = await Books.findOne({linkBook}).lean();
            let follow = curBook.follow;
            if(!follow)
            {
                follow = 1;
            }
            else follow--;
            let favour = curUser.favour;
            favour = favour.replace(linkBook+'/',"");
            await Users.findOneAndUpdate({acc:acc},{favour:favour});
            await Books.findOneAndUpdate({linkBook:linkBook},{follow:follow});
            res.status(200).json({acc});
        }
        catch(err){

        }
    }

    async removeFavourPdf(req,res,next){
        const {acc,linkPdf} = req.body;
        try{
            const curUser = await Users.findOne({acc}).lean();
            const curPdf = await Pdfs.findOne({filename:linkPdf}).lean();
            let follow = curPdf.follow;
            if(!follow)
            {
                follow = 1;
            }
            else follow--;
            let favour = curUser.favour;
            favour = favour.replace(linkPdf+'/',"");
            await Users.findOneAndUpdate({acc:acc},{favour:favour});
            await Pdfs.findOneAndUpdate({filename:linkPdf},{follow:follow});
            res.status(200).json({acc});
        }
        catch(err){

        }
    }

    async likeBook(req,res,next){
        const {acc,linkBook} = req.body;
        try{
            const curUser = await Users.findOne({acc}).lean();
            const curBook = await Books.findOne({linkBook}).lean();
            let like = curBook.like;
            if(!like)
            {
                like = 1;
            }
            else like++;
            let likeBook = curUser.likeBook;
            likeBook+=linkBook+'/';
            await Users.findOneAndUpdate({acc:acc},{likeBook:likeBook});
            await Books.findOneAndUpdate({linkBook:linkBook},{like:like});
        }
        catch(err){

        }
    }

    async likePdf(req,res,next){
        const {acc,linkPdf} = req.body;
        try{
            const curUser = await Users.findOne({acc}).lean();
            const curPdf = await Pdfs.findOne({filename:linkPdf}).lean();
            let like = curPdf.like;
            if(!like)
            {
                like = 1;
            }
            else like++;
            let likePdf = curUser.likeBook;
            likePdf+=linkPdf+'/';
            await Users.findOneAndUpdate({acc:acc},{likeBook:likePdf});
            await Pdfs.findOneAndUpdate({filename:linkPdf},{like:like});
        }
        catch(err){

        }
    }

    async disLikeBook(req,res,next){
        const {acc,linkBook} = req.body;
        try{
            const curUser = await Users.findOne({acc}).lean();
            const curBook = await Books.findOne({linkBook}).lean();
            let like = curBook.like;
            if(!like)
            {
                like = 1;
            }
            else like--;
            let likeBook = curUser.likeBook;
            likeBook = likeBook.replace(linkBook+'/','');
            await Users.findOneAndUpdate({acc:acc},{likeBook:likeBook});
            await Books.findOneAndUpdate({linkBook:linkBook},{like:like});
        }
        catch(err){

        }
    }

    async disLikePdf(req,res,next){
        const {acc,linkPdf} = req.body;
        try{
            const curUser = await Users.findOne({acc}).lean();
            const curPdf = await Pdfs.findOne({filename:linkPdf}).lean();
            let like = curPdf.like;
            if(!like)
            {
                like = 1;
            }
            else like--;
            let likePdf = curUser.likeBook;
            likePdf = likePdf.replace(linkPdf+'/','');
            await Users.findOneAndUpdate({acc:acc},{likeBook:likePdf});
            await Pdfs.findOneAndUpdate({filename:linkPdf},{like:like});
        }
        catch(err){

        }
    }

    async ShowInformation(req,res,next) {
        const acc = req.params.acc
        const user = await Users.findOne({acc:acc}).lean();
        if(user) {
            const InforUser = {
                acc: user.acc,
                fullname : user.fullname,
                birthday : user.birthday,
                gender : user.gender,
                university: user.university
            }
            res.render("me/showInfor",{InforUser})
        }     
    }

    async ShowFormFixInfor(req,res,next) {
        const acc = req.params.acc
        const user = await Users.findOne({acc:acc}).lean();
        if(user) {
            const InforUser = {

                fullname : user.fullname,
                birthday : user.birthday,
                gender : user.gender,
                university: user.university
            }
            res.render("me/formFixInfor",{InforUser})
        }     
    }

    async FixInformation (req, res, next) {
        const {fullname, birthday, gender, university, acc} = req.body
        try {
            const user = await Users.findOne({acc:acc}).lean();
            if (user) {
                await Users.findOneAndUpdate({acc:acc},{fullname,birthday,gender, university});
            }
            res.status(200).json({acc});
        }
        catch (e) {
            console.log(e)
        }
    }
}

module.exports = new MeController;