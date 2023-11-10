import React, { useEffect } from 'react'
import '../styles/Result.css';
import { Link } from 'react-router-dom';

import ResultTable from './ResultTable';
// import { useDispatch, useSelector } from 'react-redux';
// import { attempts_Number, earnPoints_Number, flagResult } from '../helper/helper';

// /** import actions  */
// import { resetAllAction } from '../redux/question_reducer';
// import { resetResultAction } from '../redux/result_reducer';
// import { usePublishResult } from '../hooks/setResult';


export default function Result() {

    // const dispatch = useDispatch()
    // const { questions : { queue ,answers}, result : { result, userId}}  = useSelector(state => state)

    // const totalPoints = queue.length * 10; 
    // const attempts = attempts_Number(result);
    // const earnPoints = earnPoints_Number(result, answers, 10)
    // const flag = flagResult(totalPoints, earnPoints)


    /** store user result */
    // usePublishResult({ 
    //     result, 
    //     username : userId,
    //     attempts,
    //     points: earnPoints,
    //     achived : flag ? "Passed" : "Failed" });

    function onRestart(){
        // dispatch(resetAllAction())
        // dispatch(resetResultAction())
    }

  return (
    <div className='container'>
        <h1 className='title text-light'>Quiz Application</h1>

        <div className='result flex-center'>
            <div className='flex'>
                <span>Username</span>
                <span className='bold'>Daily</span>
            </div>
            <div className='flex'>
                <span>Total Quiz Points : </span>
                <span className='bold'>50</span>
            </div>
            <div className='flex'>
                <span>Total Questions : </span>
                <span className='bold'>05</span>
            </div>
            <div className='flex'>
                <span>Total Attempts : </span>
                <span className='bold'>03</span>
            </div>
            <div className='flex'>
                <span>Total Earn Points : </span>
                <span className='bold'>30</span>
            </div>
            <div className='flex'>
                <span>Quiz Result</span>
                <span  className='bold'>Passed</span>
            </div>
        </div>

        <div className="start">
            <Link className='btn' to={'/'} onClick={onRestart}>Restart</Link>
        </div>

        <div className="container">
            {/* result table */}
            <ResultTable></ResultTable>
        </div>
    </div>
  )
}
