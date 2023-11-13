import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import data from '../database/data'
import { useFetchQuestions } from '../hooks/FetchQuestions';
import { updateResultAction } from '../redux/result_reducer';
import { updateResult } from '../hooks/setResult';


/** Custom Hook */
// import { useFetchQestion } from '../hooks/FetchQuestion'
// import { updateResult } from '../hooks/setResult'


export default function Questions({ onChecked }) {

    const [checked, setChecked] = useState(undefined);

    const question=data[0];

    const { trace } = useSelector(state => state.questions);
    // const {questions : {queue,answers}, result:{result,userId}} = useSelector(state => state);console.log(state);
    const [{ isLoading, apiData, serverError}] = useFetchQuestions() 
  
    const questions = useSelector(state => state.questions.queue[state.questions.trace])
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(checked);
        console.log(trace);
        dispatch(updateResult({ trace, checked}));
    
    });
    
    function onSelect(i){
        onChecked(i);
        setChecked(i);
        dispatch(updateResult({ trace, checked}));
    }
        


    //if(isLoading) return <h3 className='text-light'>isLoading</h3>
    if(serverError) return <h3 className='text-light'>{serverError || "Unknown Error"}</h3>

  return (
    <div className='questions'>
        <h2 className='text-light'>{questions?.question}</h2>

        <ul key={questions?.id}>
            {
                questions?.options.map((q, i) => (
                    <li key={i}>
                        <input 
                            type="radio"
                            value={false}
                            name="options"
                            id={`q${i}-option`}
                            onChange={() => onSelect(i)}
                        />

                        <label className='text-primary' htmlFor={`q${i}-option`}>{q}</label>
                        <div className='check '></div>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}
