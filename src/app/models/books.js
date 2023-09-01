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
       }
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model('Books',Books);