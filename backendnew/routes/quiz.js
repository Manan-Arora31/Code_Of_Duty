import express from 'express';
const router=express.Router();
import { getOneQuiz,getAllQuizzes, createQuiz } from '../controllers/quizControllers.js';


router.get('/allQuizzes',getAllQuizzes);
router.get('/:quizId',getOneQuiz);
//router.get('/createQuiz',quizController.createQuiz);
router.post('/createQuiz',createQuiz);


export default router
