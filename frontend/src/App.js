import React from 'react';
import {BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import AdminQuizCreation from './components/admin/AdminQuizCreation';
import QuizList from './components/quiz/QuizList';

function App() {
 
  return (
    <div>   
     <Router>
         <Routes>
          
           <Route path="/admin/create-quiz" element={<AdminQuizCreation />} />
            <Route path="/quizzes" element={ <QuizList />} />


            </Routes>
  

    </Router>

    </div>



  );

}

export default App