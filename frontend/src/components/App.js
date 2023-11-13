import { Fragment } from 'react';
import '../styles/App.css';
import {
  createBrowserRouter,
  RouterProvider,Route,Routes
} from "react-router-dom";

/**import components */
import Main from './Main';
import Quiz from './Quiz';
import Result from './Result';
import MCQ from './MCQ';
import TrueFalse from './TrueFalse';
import SingleWord from './SingleWord';
import Questions from './Questions';
import { CheckUserExist } from '../helper/helper';

const router=createBrowserRouter([
  {
    path : "/" ,
    element : <Main/>
  },
  {
    path: '/quiz' ,
    element:<Quiz/>
  },
  {
    path: '/result' ,
    element:<Result/>
  },
  {
    path: '/MCQ' ,
    element:<MCQ/>
  },
  {
    path: '/TrueFalse' ,
    element: <TrueFalse/>
  },
  {
    path: '/SingleWord' ,
    element: <SingleWord/>
  }
])

function App() {
  return (
    
  <Fragment>
      <RouterProvider router={router}/>
  </Fragment>
  )
}

export default App;
