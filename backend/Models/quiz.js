const mongoose=require('mongoose');

const questioSchema=new mongoose.Schema({
    text:String,
    options:[String],
    correctOption:String,
});

const quizSchema=new mongoose.Schema({
    title:String,
    category:String,
    questions:[questioSchema],
});

module.exports=mongoose.model('Quiz',quizSchema);