import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const QuizList=()=>{
    const [quizzes,setQuizzes]=useState([]);

    useEffect(()=>{
        const fetchQuizzes=async()=>{

            try{
              const response=await axios.get('http://localhost:8000/api/quiz/allQuizzes');
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
                <li key={quiz._id}> 
                {quiz.title}
                <Link to={`/quiz/${quiz.quizId}`}>Take Quiz</Link>

                </li>
            ))}
           </ul>

        </div>
    );
};
export default QuizList;