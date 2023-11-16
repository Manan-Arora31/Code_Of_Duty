import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function QuizPage() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    // Fetch the specific quiz using the quizId
    axios.get(`http://localhost:8000/api/quiz/${quizId}`)
      .then(response => setQuiz(response.data))
      .catch(error => console.error(error));
  }, [quizId]);

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{quiz.title}</h2>
      <ul>
        {quiz.questions.map(question => (
          <li key={question._id}>
            <p>{question.text}</p>
            <ul>
              {question.options.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
            <p>Correct Option: {question.correctOption}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizPage;