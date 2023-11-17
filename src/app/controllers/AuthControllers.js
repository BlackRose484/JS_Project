const Users = require('../models/users');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hungnbc2@gmail.com',
        pass: 'vewf xfhz gldb enrx'
    }
})


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
    

    async preSignUp(req,res,next) {
        const {acc,password} = req.body;

        const code = Math.floor(Math.random() * 1000000);
        
        const mailOptions = {
            from: 'hungnbc2@gmail.com',
            to: acc,
            subject: 'Test Email',
            text: `Hello, this is a test email from your Express.js app!
                    Your code is ${code}`
        };

        try {
            const isExist = await Users.findOne({acc});
            if (isExist) {
                console.log("No existy");
                res.status(400).json({error:"Email is Exist"});
            } else {
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        res.status(400).json({error});
                    } else {
                        res.status(200).json({code});
                    }
                });
            }   
        }
        catch(err) {

        }
    }

    async signUp(req,res,next) {

        const {acc,password} = req.body;
        try{
            const newUser = await Users.create({acc,password})
            const token = createToken(newUser._id);
            res.cookie('jwt',token,{ httpOnly:true});
            res.status(200).json({user:acc});
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
    async reGetPassword(req,res,next)
    {
        const {acc} = req.body;
        try {
            const getRes = await Users.findOne({acc});
            if(getRes)
            {
                const mailOptions = {
                    from: 'hungnbc2@gmail.com',
                    to: acc,
                    subject: 'Test Email',
                    text: `Hello, this is a test email from your Express.js app!
                            Your password is ${getRes.password}`
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        res.status(400).json({error});
                    } else {
                        res.status(200).json({info : "Email sent:"});
                    }
                });
            } else {
                res.status(400).json({error:"Email is not Register"});
            }
        } catch(err) {  
            res.status(400).json({error:"Email is not Register"});
        }
    }
}

module.exports = new AuthController