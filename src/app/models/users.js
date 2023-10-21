const mongoose = require('mongoose');
//const bcrypt = require('bcrypt')


const Schema = mongoose.Schema;
const Users = new Schema(
    {
        fullname: {
            type : String,
            default: ""
        },
        acc:{
            type: String,
            required: [true,"Please enter acc"],
            unique:true,
        },
        birthday: {
            type : Date,
            default: ""
        },
        password:{
            type:String,
            required:[true,"Please enter password"],
            minlength:[6,"Password require 6"]
        },
        favour:{
            type:String,
            default:""
        },
        likeBook:{
            type:String,
            default:""
        },
        university: {
            type: String,
            default:""
        },
        gender: {
            type : String,
            default:""
        }
    },
    {
        timestamps:true
    }
)

// Users.pre('save',async function(next){
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password,salt);
//     next();
// })

Users.statics.login = async function(name,password){
    const user = await this.findOne({acc: name});
    if(user)
    {
      let auth  = false
      if(user.password === password)
      {
        auth = true
      }
      if(auth)
      {
        return user;
      }
      throw Error('incorect password');
    }
    throw Error('incorect account');
}

module.exports = mongoose.model('Users',Users)