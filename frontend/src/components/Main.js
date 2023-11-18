import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import quiz from './Quiz';
import MCQ from './MCQ';
import TrueFalse from './TrueFalse';
import SingleWord from './SingleWord';
import '../styles/Main.css'
import { setUserId } from '../redux/result_reducer';
import { useDispatch } from 'react-redux';

function Main() {

    const inputRef = useRef(null);
    const dispatch=useDispatch();
    
    function startQuiz() {
        if(inputRef.current?.value){
            dispatchEvent(setUserId(inputRef.current?.value));
        }
    }

  return (
    <div className='container'>
        <h1 className='title text-light'>Quiz Application</h1>

        <div className='box'>
            <Link to={'MCQ'} >
            <div class="card">
            <img src="https://mcqquestions.net/static/images/q-%26-a.webp" alt="Avatar" style={{width:'100%'}}/>
            </div>
            </Link>
            <Link to={'TrueFalse'} >
            <div class="card">
            <img src="https://mcqquestions.net/static/images/q-%26-a.webp" alt="Avatar" style={{width:'100%'}}/>
            </div>
            </Link>
            <Link to={'SingleWord'} >
            <div class="card">
            <img src="https://mcqquestions.net/static/images/q-%26-a.webp" alt="Avatar" style={{width:'100%'}}/>
            </div>
            </Link>
        </div>

        
        {/* <form id="form">
            <input ref={inputRef} className="userid" type="text" placeholder='Username*' />
        </form>

        <div className='start'>
            <Link className='btn' to={'quiz'} onClick={startQuiz}>Start Quiz</Link>
        </div> */}

    </div>
  )
}

export default Main
