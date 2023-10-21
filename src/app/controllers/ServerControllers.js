const Books = require("../models/books");
const Users = require("../models/users");
const Pdfs = require("../models/pdfs");

class ServerController{
    async show(req,res,next){
        await Books.find({})
        .lean()
        .then((book)=>{
            res.render('server/mainPage',{book})
        })
        .catch(next);
    }
    async showBook(req,res,next){
        const acc = req.params.acc;
        const link = req.params.link;
        const curAcc = await Users.findOne({acc});
        let isHave = curAcc.favour.includes(link);
        let isLike = curAcc.likeBook.includes(link);
        const curBook = await Books.findOne({linkBook:link});
        const newCurBook = {
            name : curBook.nameBook,
            link: curBook.linkBook,
            des: curBook.desBook,
            isHave: isHave,
            isLike:isLike,
            like:curBook.like,
            follow:curBook.follow
        }
        res.render('server/showBook',{newCurBook})

    }

    async showPdf(req,res,next){
        await Pdfs.find({})
        .lean()
        .then((pdf)=>{
            res.render('server/showPdf',{pdf})
        })
        .catch(next);
    }
    async showFilePdf(req,res,next){
        const acc = req.params.acc;
        const link = req.params.link;
        const curAcc = await Users.findOne({acc});
        let isHave = curAcc.favour.includes(link);
        let isLike = curAcc.likeBook.includes(link);
        const curBook = await Pdfs.findOne({filename:link}).lean();
        const newCurBook = {
            title:curBook.title,
            author:curBook.author,
            desPdf: curBook.desPdf,
            filename: curBook.filename,
            isHave: isHave,
            isLike:isLike,
            like:curBook.like,
            follow:curBook.follow

        }
        res.render('server/showFilePdf',{newCurBook})
    }

}

module.exports = new ServerController;