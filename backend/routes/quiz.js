const express=require('express');
const router=express.Router();
const quizController=require('../controllers/quizControllers');


router.get('/allQuizzes',quizController.getAllQuizzes);
//router.get('/createQuiz',quizController.createQuiz);
router.post('/createQuiz', quizController.createQuiz);


module.exports=router;
