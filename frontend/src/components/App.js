import { Fragment,React} from 'react';
import '../styles/App.css';
import {
  createBrowserRouter,Router,
  RouterProvider,Route,Routes,Navigate
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
import AdminQuizCreation from './admin/AdminQuizCreation';
import Adminlogin from './admin/Adminlogin';
import Adminregister from './admin/Adminregister';
import AdminDashboard from './admin/AdminDashboard';
import AdminLogout  from './admin/AdminLogout.jsx';
import QuizList from './quiz/QuizList.jsx';
import Mainman from "./Main/index.jsx";
import Signup from "./Signup";
import Login from "./Login";
import EmailVerify from "./EmailVerify";
import QuizPage from './quiz/QuizPage.jsx';
import ForgotPassword from "./ForgotPassword";
import PasswordReset from "./PasswordReset";
import DetailReportPage from './DetailReport.js';
import logo from '../images/logo.jpeg';

import ProctorPage from "./ProctorPage"
import DisplayPhotos from "./DisplayPhotos"
const user = localStorage.getItem("token");
const router=createBrowserRouter([
  {
    path : "/" ,
    element : <Main/>
  },
  {
    path: '/quiz/:id/:userId' ,
    element:<Quiz/>
  }, 
  {
    path: '/quiz/:id/:userId/result/detailReport' ,
    element:<DetailReportPage/>
  },
  {
    path: '/quiz/:id/:userId/result' ,
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
  },
  {
    path:"/admin/register",
    element:<Adminregister />
  },
  {
    path:"/admin/login",
    element:<Adminlogin />
  }, 
  {
    path:"/admin/logout",
    element:<AdminLogout />
  },
  {
    path:"/admin/dashboard",
    element:<AdminDashboard />
  },
  {
    path:"/admin/create-quiz",
    element:<AdminQuizCreation />
  },
  {
    path:"/admin/quizzes",
    element:<QuizList />
  },
  {
    path:"/quiz/:quizId",
    element:<QuizPage />
  },
  { path:"/home", 
    element:<Mainman />
  },
  {
    path:"/signup",
    element:<Signup />
  },
  {
		path:"/login",
    element:<Login />
  },
  {
	 path:"/",
   element:<Navigate replace to="/login" />
  },
  {
   path:"/users/:id/verify/:token",
    element:<EmailVerify />
  },
  {
    path:"/forgot-password",
    element:<ForgotPassword />
  },
  {
    path:"/password-reset/:id/:token",
    element:<PasswordReset />
  },
  {
    path:"/proctor",
    element:<ProctorPage />
  },
  {
    path:"/displayPhotos",
    element:<DisplayPhotos />
  }

])

function App() {
  return (
    
  <Fragment>
    <div className='base'>
      <img className='logo' src={logo}/>
      <RouterProvider router={router}/>
    </div>
  </Fragment>
  )
}

export default App;
