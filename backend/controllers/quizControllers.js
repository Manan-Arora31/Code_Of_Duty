const Quiz=require('../Models/quiz');

exports.getAllQuizzes=async(req,res)=>{
 try{
    const quizzes=await Quiz.find();
    res.json(quizzes);
 }catch(err)
 {
    res.status(500).json({message:err.message});
 }
};

exports.createQuiz=async(req,res)=>{
    const {title,category,questions}=req.body;

    try{
      const newQuiz=new Quiz({title,category,questions});

      const savedQuiz=await newQuiz.save();

       console.log("quiz is created");
      res.status(201).json(savedQuiz);

    }catch(err)
    {
        res.status(500).json({message:err.message});
    }

}