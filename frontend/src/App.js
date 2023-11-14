import React from 'react';
import {BrowserRouter as Router,Route,Routes,Navigate } from 'react-router-dom';
import AdminQuizCreation from './components/admin/AdminQuizCreation';
import QuizList from './components/quiz/QuizList';
import Main from "./components/Main/index";
import Signup from "./components/Signup";
import Login from "./components/Login";
import EmailVerify from "./components/EmailVerify";

function App() {
  const user = localStorage.getItem("token");
  return (
    <div>   
     <Router>
         <Routes>
          
           <Route path="/admin/create-quiz" element={<AdminQuizCreation />} />
            <Route path="/quizzes" element={ <QuizList />} />
            {user && <Route path="/" exact element={<Main />} />}
			      <Route path="/signup" exact element={<Signup />} />
			      <Route path="/login" exact element={<Login />} />
			      <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
            </Routes>
  

    </Router>

    </div>



  );

}

export default App