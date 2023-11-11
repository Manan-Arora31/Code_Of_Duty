const mongoose=require('mongoose');
const connectDB=async()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/mydb');
        console.log("Connected to db");
    } 
    catch(err)
    {
        console.log(err);
    }
   
}
module.exports=connectDB;