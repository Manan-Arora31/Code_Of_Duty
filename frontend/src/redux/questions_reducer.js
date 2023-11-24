import { createSlice } from "@reduxjs/toolkit";

export const questionsReducer = createSlice({
    name:'questions',
    initialState:{
        quizId: null,
        queue:[],
        answers:[],
        trace:0
    },
    reducers : {
        startExamAction :(state,action) => {
            let {quizId,questions , answers} = action.payload;
            return {
                ...state,
                quizId,
                queue: questions,
                answers:answers
            }

        },
        moveNextAction: (state) => {
            return {
                ...state,
                trace:state.trace+1
            }
        },
        movePrevAction: (state) => {
            return {
                ...state,
                trace: state.trace-1
            }
        },
        resetAllAction: () => {
            return {
                quizId: null,
                queue:[],
                answers:[],
                trace:0
            }
        }
    }
})


export const {startExamAction,moveNextAction,movePrevAction,resetAllAction} =questionsReducer.actions

export default questionsReducer.reducer;