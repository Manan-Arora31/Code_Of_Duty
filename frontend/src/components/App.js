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

const router=createBrowserRouter([
  {
    path : "/" ,
    element : <Main/>
  },
  {
    path: '/quiz' ,
    element: <Quiz/>
  },
  {
    path: '/result' ,
    element: <Result/>
  },
])

function App() {
  return (
    
  <Fragment>
      <RouterProvider router={router}/>
  </Fragment>
  )
}

export default App;
