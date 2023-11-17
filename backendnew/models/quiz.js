import mongoose from 'mongoose';

const questioSchema=new mongoose.Schema({
    text:String,
    options:[String],
    correctOption:String,
});

const quizSchema=new mongoose.Schema({
    quizId:{type:String,unique:true},
    title:String,
    category:String,
    questions:[questioSchema],
    windowStart: Date,
    windowEnd: Date,
});

export default mongoose.model('Quiz',quizSchema);