const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Pdfs = new Schema(
    {
        filename:{
            type:String,
        },
       title:{
        type:String,
        required:[true,"Please enter name of book"]
       },
      author:{
        type:String,
      },
       pdfPath:{
        type:String
       },
       desPdf:{
        type:String
       },
       like:{type:Number,default:1},
       follow:{type:Number,default:1}
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model('Pdfs',Pdfs);