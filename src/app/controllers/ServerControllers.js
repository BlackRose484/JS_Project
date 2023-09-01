const Books = require("../models/books");

class ServerController{
    show(req,res,next){
        Books.find({})
        .lean()
        .then((book)=>{
            res.render('server/mainPage',{book})
        })
        .catch(next);
    }
}

module.exports = new ServerController;