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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

};
const getidQuiz=async(req,res)=>{
  try {
    const qid=req.params.Id;
    console.log(qid);
    const quiz = await Quiz.findOne({ _id: qid  });
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    console.log(quiz)
    const windowStart = quiz.windowStart;
    const windowEnd = quiz.windowEnd;
    const now = new Date();
    console.log("Today date" + now.toLocaleString());
    console.log("windowStart" + windowStart.toLocaleString());
    console.log("windowEnd" + windowEnd.toLocaleString());
    
    if(now >= windowStart && now <= windowEnd){
      res.json(quiz);   
    } 
    else{
      res.json(null);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

};
const getreqQuizzes=async(req,res)=>{
  const {category} = req.query;
 try{
    const quizzes=await Quiz.find({category:category});
    res.json(quizzes);
 }catch(err)
 {
    res.status(500).json({message:err.message});
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
  const {title,category,questions,windowStart,windowEnd}=req.body;
  // const windowStart = new Date('November 17, 2023 11:45:00')
  // const windowEnd = new Date('November 17, 2023 12:45:00')
  console.log('windowStart:', windowStart.toLocaleString());
  console.log('windowEnd:', windowEnd.toLocaleString());
    console.log('hello');
    console.log(req.body);

    try{
      const quizId = shortid.generate();
      const newQuiz=new Quiz({quizId,title,category,questions,windowStart,windowEnd});

      const savedQuiz=await newQuiz.save();

       console.log("quiz is created");
      res.status(201).json(savedQuiz);

    }catch(err)
    {
        res.status(500).json({message:err.message});
    }

}

export { getAllQuizzes, createQuiz,getOneQuiz,getreqQuizzes,getidQuiz }