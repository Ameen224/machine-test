//  config/db.js

const mongoose=require("mongoose")


const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.mongodb)
        console.log("mongo is connected");
    } catch (error) {
        console.log("error:",error);
        
    }
}

module.exports= connectDB