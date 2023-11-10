import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import data from '../database/data'


/** Custom Hook */
// import { useFetchQestion } from '../hooks/FetchQuestion'
// import { updateResult } from '../hooks/setResult'


export default function Questions({ onChecked }) {

    const [checked, setChecked] = useState(undefined);
    const question=data[0];
    // const { trace } = useSelector(state => state.questions);
    // const result = useSelector(state => state.result.result);
    // const [{ isLoading, apiData, serverError}] = useFetchQestion() 

    // const questions = useSelector(state => state.questions.queue[state.questions.trace])
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(updateResult({ trace, checked}))
    // }, [checked])
    
    function onSelect(){
        console.log("radio changed");
        // onChecked(i)
        // setChecked(i)
        // dispatch(updateResult({ trace, checked}))
    }


    // if(isLoading) return <h3 className='text-light'>isLoading</h3>
    // if(serverError) return <h3 className='text-light'>{serverError || "Unknown Error"}</h3>

  return (
    <div className='questions'>
        <h2 className='text-light'>Sample Question 1</h2>

        <ul key={question.id}>
            {
                question.options.map((q, i) => (
                    <li key={i}>
                        <input 
                            type="radio"
                            value={false}
                            name="options"
                            id={`q${i}-option`}
                            onChange={ onSelect()}
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
