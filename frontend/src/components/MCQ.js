import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {setUserId} from '../redux/result_reducer';

function MCQ() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.result.userId);
  console.log(userId);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/quiz/reqQuizzes?category=MCQ');
        console.log(response.data);
        setQuizzes(response.data);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching quizzes.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleBack = () => {
    navigate("/");
  }
  return (
    <div className='container'>
      <button onClick={handleBack}>back</button>
      <h1 className='title text-light'>MCQ Quizzes</h1>

      {/* <ul>
        <li>You will be asked 10 questions one after another.</li>
        <li>10 points are awarded for the correct answer.</li>
        <li>Each question has three options. You can choose only one option.</li>
        <li>You can review and change answers before the quiz finishes.</li>
        <li>The result will be declared at the end of the quiz.</li>
      </ul> */}

      <div className='container2'>
        <h2>Quizzes</h2>
        <div className='topics'>
          {quizzes.map((data, i) => (
            <Link to={`/quiz/${data._id}/${userId}`} key={i}>
              <div className="topic_of_quiz">
                <h3>{data.title}</h3>
                <Link to={`/quiz/${data._id}/${userId}/leaderboard`} key={i}>
                <p>leaderboard</p>
                </Link>
                
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MCQ;