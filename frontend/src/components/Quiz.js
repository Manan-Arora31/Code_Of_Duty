import React, { useEffect, useState } from 'react';
import Questions from './Questions';
import { useDispatch, useSelector } from 'react-redux';
import {Navigate} from 'react-router-dom'
import { useNavigate } from "react-router-dom"

import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestions';
import { PushAnswer } from '../hooks/setResult';


function Quiz() {
  const styles = {
    color:"white"
  }

  const navigate = useNavigate();

  const [check,setChecked] = useState(undefined);

  const [quizTime, setQuizTime] = useState(30); 
  const [questionTime, setQuestionTime] = useState(10);

  useEffect(() => {
    const quizTimerInterval = setInterval(() => {
      if (quizTime === 0) {
        clearInterval(quizTimerInterval);
        // alert('Time is up! Redirecting to the result page.');
        // navigate('/result')
        redirectToResultPage();
      } else {
        setQuizTime(quizTime - 1);
      }
    }, 1000);

    const questionTimerInterval = setInterval(() => {
      if (questionTime === 0) {
        clearInterval(questionTimerInterval);
        onNext();
      } else {
        setQuestionTime(questionTime - 1);
      }
    }, 1000);

    return () => {
      clearInterval(quizTimerInterval);
      clearInterval(questionTimerInterval);
    };
  }, [quizTime, questionTime]);

  
  const { queue , trace} = useSelector(state => state.questions);
  const {result} = useSelector(state => state.result);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(result);
  })

  const redirectToResultPage = ()=>{
    alert('Time is up! Redirecting to the result page.');
    navigate('/result')
  }

function onNext(){
  console.log('On next click');
  setQuestionTime(10);
  if(trace < queue.length){
    dispatch(MoveNextQuestion());
    if(result.length <= trace)
    dispatch(PushAnswer(check));
  }

  setChecked(undefined);
}

function onPrev(){
  console.log('On prev click');
  if(trace > 0)
  dispatch(MovePrevQuestion());
}

function onChecked(check){
  console.log(check);
  setChecked(check);
}


if(result.length && result.length>=queue.length){
  return <Navigate to={'/result'} replace={true}></Navigate>
}

  return (
    <div className='container'>
        <h1 className='title text-light'>Quiz Application</h1>
        <div style={styles} id="quiz-timer">Total Time: {Math.floor(quizTime / 60)}:{quizTime % 60}</div>
        <div style={styles} id="question-timer">Question Time: {Math.floor(questionTime / 60)}:{questionTime % 60}</div>

        {/* display questions */}
        <Questions onChecked={onChecked}/>

        <div className='grid'>
            {trace>0?<button className='btn prev' onClick={onPrev}>Prev</button>:<div></div>}
            <button className='btn next' onClick={onNext}>Next</button>
        </div>
    </div>
  )
}

export default Quiz