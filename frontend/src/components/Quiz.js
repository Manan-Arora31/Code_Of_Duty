import React, { useEffect } from 'react';
import Questions from './Questions';
import { useSelector } from 'react-redux';
import {questions} from '../redux/store';

function onNext(){
    console.log('On next click');
}

function onPrev(){
    console.log('On prev click');
}

function Quiz() {
  
  const {questions,result} = useSelector(state => state);

  useEffect(() => {
    console.log(questions);
  })

  return (
    <div className='container'>
        <h1 className='title text-light'>Quiz Application</h1>

        {/* display questions */}
        <Questions/>

        <div className='grid'>
            <button className='btn prev' onClick={onPrev}>Prev</button>
            <button className='btn next' onClick={onNext}>Next</button>
        </div>
    </div>
  )
}

export default Quiz