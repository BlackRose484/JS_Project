const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Books = new Schema(
    {
       nameBook:{
        type:String,
        required:[true,"Please enter name of book"]
       },
       linkBook:{
        type: String,
        required: [true,"Please enter link of book"],
        unique:true
       },
       desBook:{
        type:String
       },
       like:{type:Number,default:1},
       follow:{type:Number,default:1}
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model('Books',Books);