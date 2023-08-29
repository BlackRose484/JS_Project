const mongoose = require('mongoose');


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

module.exports = mongoose.model('Users',Users)