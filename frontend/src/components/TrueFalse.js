import React, { useRef } from 'react'
import { Link } from 'react-router-dom';

function TrueFalse() {
  const inputRef = useRef(null); 
    const startQuiz=0;
  return(
    <div className='container'>
        <h1 className='title text-light'>True/False Quizes</h1>

        <ul>
            <li>You will be asked 10 questions one after another.</li>
            <li>10 points is awarded for the correct answer.</li>
            <li>Each question has three options. You can choose only one options.</li>
            <li>You can review and change answers before the quiz finish.</li>
            <li>The result will be declared at the end of the quiz.</li>
        </ul>

        <div className='container2'>
          <h2>Topics</h2>
          <div className='topics'>
          <Link to={'MCQ'}>
            <div class="topic_of_quiz">
              <h3>Mathematics</h3>
            </div>
          </Link>
          <Link to={'MCQ'}>
            <div class="topic_of_quiz">
              <h3>Mathematics</h3>
            </div>
          </Link>
          <Link to={'MCQ'}>
            <div class="topic_of_quiz">
              <h3>Mathematics</h3>
            </div>
          </Link>
          <Link to={'MCQ'}>
            <div class="topic_of_quiz">
              <h3>Mathematics</h3>
            </div>
          </Link>
          </div>
            
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

export default TrueFalse