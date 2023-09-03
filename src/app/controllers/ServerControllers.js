const Books = require("../models/books");
const Users = require("../models/users");

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
            isLike:isLike
        }
        res.render('server/showBook',{newCurBook})

    }
}

module.exports = new ServerController;