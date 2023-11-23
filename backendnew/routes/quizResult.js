import express from 'express';
const router=express.Router();
import quizResult from '../models/quizResult.js';

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

export default router;