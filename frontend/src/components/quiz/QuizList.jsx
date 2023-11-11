import React,{useState,useEffect} from 'react';
import axios from 'axios';

const QuizList=()=>{
    const [quizzes,setQuizzes]=useState([]);

    useEffect(()=>{
        const fetchQuizzes=async()=>{

            try{
              const response=await axios.get('http://localhost:8000/quiz/allQuizzes');
              setQuizzes(response.data);
            }catch(err){
                console.error(err);
            }

        }; 
    fetchQuizzes();

    },[]);


    return(

        <div>
            <h2>
                Quizzes
            </h2>
           <ul>
            {quizzes.map((quiz)=>(
                <li key={quiz._id}> {quiz.title}</li>
            ))}
           </ul>

        </div>
    );
};
export default QuizList;