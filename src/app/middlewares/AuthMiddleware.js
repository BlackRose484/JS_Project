const jwt = require('jsonwebtoken');
const Users = require('../models/users');

const Protect =  (req,res,next)=>{
    const token = req.cookies.jwt;
    if(token)
    {
        jwt.verify(token,'BlackRose',(err,decoded)=>{
            if(err)
            {
                console.log("Err");
                res.redirect('/auth/loginForm');
            }
            else
            {
                console.log(decoded);
                next();
            }
        })
    }
    else
    {
        res.redirect('/auth/loginForm');
    }
}

const CheckUser = (req,res,next)=>{
    const token = req.cookies.jwt;
    if(token)
    {
        jwt.verify(token,'BlackRose', async (err,decoded)=>{
            if(err)
            {
                res.locals.user = null;
                next();
            }
            else
            {
                let user = await Users.findById(decoded.id);
                res.locals.user = user.acc;
                next();
            }
        })
    }
    else
    {
        res.locals.user = null;
        next();
    }
}

module.exports = {Protect,CheckUser};