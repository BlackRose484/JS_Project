const Users = require('../models/users');

function HandleErr(err){
    const errors = {acc:"",password:""};
    if(err.code===11000)
    {
        errors.acc = "Exist";
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

class AuthController  {

    async signUp(req,res,next) {
        const {acc,password} = req.body;
        try{
            const newUser = await Users.create({acc,password})
            res.status(200).json({acc:newUser._id});
        }
        catch(err)
        {
           const errors = HandleErr(err);
           res.status(400).json({errors});
        }
    }
}

module.exports = new AuthController