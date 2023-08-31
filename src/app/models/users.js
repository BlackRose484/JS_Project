const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const Schema = mongoose.Schema;
const Users = new Schema(
    {
        acc:{
            type: String,
            require: true,
            unique:true,
        },
        password:{
            type:String,
            require:true,
            minlength:[6,"Password require 6"]
        }
    },
    {
        timestamps:true
    }
)

Users.pre('save',async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

Users.statics.login = async function(name,password){
    const user = await this.findOne({acc: name});
    if(user)
    {
      const auth = await bcrypt.compare(password,user.password);
      if(auth)
      {
        return user;
      }
      throw Error('incorect password');
    }
    throw Error('incorect account');
}

module.exports = mongoose.model('Users',Users)