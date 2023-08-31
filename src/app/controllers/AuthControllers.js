const Users = require('../models/users');
const jwt = require('jsonwebtoken');


function HandleErr(err){
    const errors = {acc:"",password:""};
    if(err.code===11000)
    {
        errors.acc = "Exist";
        return errors;
    }
    if(err.message==="incorect account"||err.message==="incorect password")
    {
        errors.acc="Incorect account or password";
        errors.password="Incorect password or account";
        return errors;
    }
    if(err.message.includes('Users validation failed'))
    {
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}

const maxAge = 1*60*24*24;
const createToken = (id)=>{
    return jwt.sign({ id },'BlackRose',{
        expiresIn: maxAge
    });
}
class AuthController  {

    async signUp(req,res,next) {
        const {acc,password} = req.body;
        try{
            const newUser = await Users.create({acc,password})
            const token = createToken(newUser._id);
            res.cookie('jwt',token,{ httpOnly:true});
            res.status(200).json({user:newUser._id});
        }
        catch(err)
        {
           const errors = HandleErr(err);
           res.status(400).json({errors});
        }
    }
    async login(req,res,next){
        const {acc,password} = req.body;
        try{
            const user = await Users.login(acc,password);
            const token = createToken(user._id);
            res.cookie('jwt',token,{httpOnly:true});
            res.status(200).json({user:user._id});
        }
        catch(err){
            const errors = HandleErr(err);
            res.status(404).json({errors});
        }
    }
    getLogin(req,res,next)
    {
        res.render('auth/login');
    }
    getRegis(req,res,next)
    {
        res.render('auth/register');
    }
    logout(req,res,next)
    {
        res.cookie('jwt','',{maxAge:1});
        res.redirect('/');
    }
}

module.exports = new AuthController