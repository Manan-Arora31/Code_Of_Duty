import express from 'express';
const router=express.Router();
import { getOneQuiz,getAllQuizzes, createQuiz,getreqQuizzes,getidQuiz } from '../controllers/quizControllers.js';


router.get('/allQuizzes',getAllQuizzes);
router.get('/reqQuizzes',getreqQuizzes);
router.get('/:quizId',getOneQuiz);
router.get('/one/:Id',getidQuiz);
//router.get('/createQuiz',quizController.createQuiz);
router.post('/createQuiz',createQuiz);


export default router
