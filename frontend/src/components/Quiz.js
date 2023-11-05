import React from 'react';

function onNext(){
    console.log('On next click');
}

function onPrev(){
    console.log('On prev click');
}

function Quiz() {
  return (
    <div className='container'>
        <h1 className='title text-light'>Quiz Application</h1>

        {/* display questions */}

        <div className='grid'>
            <button className='btn prev' onClick={onPrev}>Prev</button>
            <button className='btn next' onClick={onNext}>Next</button>
        </div>
    </div>
  )
}

export default Quiz