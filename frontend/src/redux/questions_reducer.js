import { createSlice } from "@reduxjs/toolkit";

export const questionsReducer = createSlice({
    name:'questions',
    initialState:{
        queue:[],
        answers:[],
        trace:0
    },
    reducers : {
        startExamAction :(state={},action) => {
            return {
                ...state,
                queue: action.payload
            }

        }
    }
})


export const {startExamAction} =questionsReducer.actions

export default questionsReducer.reducer;