import Quiz from '../Models/quiz.js';
import shortid from 'shortid';
const getOneQuiz=async(req,res)=>{
  try {
    const qid=req.params.quizId;
    console.log(qid);
    const quiz = await Quiz.findOne({ quizId: qid  });
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

};

const getAllQuizzes=async(req,res)=>{
 try{
    const quizzes=await Quiz.find();
    res.json(quizzes);
 }catch(err)
 {
    res.status(500).json({message:err.message});
 }
};

const createQuiz=async(req,res)=>{
    const {title,category,questions}=req.body;
    console.log('hello');
    console.log(req.body);

    try{
      const quizId = shortid.generate();
      const newQuiz=new Quiz({quizId,title,category,questions});

      const savedQuiz=await newQuiz.save();

       console.log("quiz is created");
      res.status(201).json(savedQuiz);

    }catch(err)
    {
        res.status(500).json({message:err.message});
    }

}

export { getAllQuizzes, createQuiz,getOneQuiz }