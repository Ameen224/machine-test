// models/category

const mongoose=require('mongoose')

const categoryShema=new mongoose.Schema({
    name :{
        type:String,
    }
})

module.exports=mongoose.model("category",categoryShema) 