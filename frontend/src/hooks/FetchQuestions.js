import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import data  from '../database/data';

import * as Action from '../redux/questions_reducer';

/** fetching questions from database */

export const useFetchQuestions = (quizId) => {

    const dispatch = useDispatch();
    

    const [getData,setGetData] = useState({isLoading:false, apiData:[],serverError:null});

    useEffect(()=>{
        setGetData(prev => ({...prev,isLoading:true}));

        (async () => {
            try {
                // Fetch questions from the backend using the quizId
                // Make an API call to get questions based on the quizId
                let response = await fetch(`http://localhost:8000/api/quiz/one/${quizId}`);
                let responseobj = await response.json();
                let questions=responseobj.questions;
                console.log(questions);
                const answers = questions.map((question) => parseInt(question.correctOption, 10));
                  console.log(answers);


                if (questions.length > 0) {
                    setGetData((prev) => ({ ...prev, isLoading: false }));
                    setGetData((prev) => ({ ...prev, apiData: { questions, answers } }));

                    // Dispatch the fetched questions and answers to the Redux store
                    dispatch(Action.startExamAction({ quizId,questions, answers }));
                } else {
                    throw new Error("No Question Available");
                }
            } catch (error) {
                setGetData((prev) => ({ ...prev, isLoading: false }));
                setGetData((prev) => ({ ...prev, serverError: error.message }));
            }
        })();
    }, [dispatch, quizId]);


  return [getData,setGetData];
}

export const MoveNextQuestion = () => async (dispatch) => {

    try {
        dispatch(Action.moveNextAction());
    } catch (error){
        console.log(error);
    }
}

export const MovePrevQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.movePrevAction());
    } catch (error) {
        console.log(error);
    }

}


