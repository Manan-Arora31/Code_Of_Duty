import mongoose from "mongoose";

const quizResultSchema=new mongoose.Schema({
    quizId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Quiz',
    required:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    selectedAnswer:[{
        type:Number
    }],
    totalMarks:{
      type:Number,
      required:true
    }
});
export default mongoose.model('Result', quizResultSchema);