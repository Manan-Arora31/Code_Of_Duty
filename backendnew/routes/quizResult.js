import express from 'express';
const router=express.Router();
import quizResult from '../models/quizResult.js';
import { User } from '../models/user.js';
//import Quiz from '../models/quiz.js';
//import {User} from '../models/User.js';

router.post('/save',async(req,res)=>{
    try{
        const quizResultData=req.body;
        const savedQuizResult=await quizResult.create(quizResultData);
        res.status(201).json(savedQuizResult);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/quiz_result',async(req,res) => {
    try {
        let response = await quizResult.find({'email':req.body.userId.email});
        res.send(response);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


  

router.get('/quiz_leaderboard/:Id',async(req,res) => {
    try {
        let response = await quizResult.find({'quizId':req.params.Id}).populate('userId','firstName').exec();
        response.sort((a, b) => b.totalMarks - a.totalMarks);
        res.send(response.filter((item, index, self) =>
            index === self.findIndex((t) => t.userId === item.userId)
          ));
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default router;