const Books = require('../models/books');
const Users = require('../models/users');

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
                const favour = userOfBook.favour+'/'+ linkBook;
                console.log(favour);
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
    async favourBook(req,res,next){
        const acc = req.params.slug;
        const curUser = await Users.findOne({acc:acc}).lean();

        if(curUser.favour)
        {
            const bookLike = curUser.favour.split('/');
            console.log(bookLike);
            res.render('me/favour',{bookLike});
        }
        else res.render('me/favour');
    }

    async addFavourBook(req,res,next){
        const {acc,linkBook} = req.body;
        try{
            const curUser = await Users.findOne({acc}).lean();
            let favour = curUser.favour;
            favour+=linkBook+'/';
            await Users.findOneAndUpdate({acc:acc},{favour:favour});
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
            let favour = curUser.favour;
            favour = favour.replace(linkBook,"");
            await Users.findOneAndUpdate({acc:acc},{favour:favour});
            res.status(200).json({acc});
        }
        catch(err){

        }
    }
}

module.exports = new MeController;