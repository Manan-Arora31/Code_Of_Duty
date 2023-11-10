import {combineReducers, configureStore} from '@reduxjs/toolkit'
import questionsReducer from './questions_reducer'
import {resultReducer} from './result_reducer'


const rootReducer = combineReducers({
    questions: questionsReducer,
    result: resultReducer
})


export default configureStore({reducer:rootReducer});
