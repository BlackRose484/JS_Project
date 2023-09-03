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
                const favour = userOfBook.favour+ linkBook+'/';
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
            //console.log(bookLike);
            
            // const BookLike = bookLike.reduce(async(result,book)=>{
            //     const Book = await Books.findOne({linkBook:book}).lean();
            //     console.log(Book);
            //     console.log(result);
            // },[])
            // //console.log(BookLike);
            let BookLike =[];
            for(let book of bookLike)
            {
                const Book = await Books.findOne({linkBook:book}).lean();
                if(Book)BookLike.push(Book);
            }
            console.log(BookLike);
            res.render('me/favour',{BookLike});
        }
        else res.render('me/favour');
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
}

module.exports = new MeController;