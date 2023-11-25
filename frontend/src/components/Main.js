import { Link,useNavigate } from 'react-router-dom';
import React, { useRef, useEffect } from 'react'
import quiz from './Quiz';
import MCQ from './MCQ';
import TrueFalse from './TrueFalse';
import SingleWord from './SingleWord';
import '../styles/Main.css'
import { setUserId } from '../redux/result_reducer';
import { useDispatch } from 'react-redux';

function Main() {

    const styles = {
        border: 'none',
        outline: 'none',
        padding: '12px 0',
        backgroundColor: 'white',
        borderRadius: '20px',
        width: '120px',
        fontWeight: 'bold',
        fontSize: '14px',
        cursor: 'pointer',
        marginRight: '20px',
      };

    const navigate = useNavigate();
	const user = localStorage.getItem("token");
    console.log(user)

    useEffect(() => {
		// Redirect to login page if the user is not logged in
		if (!user) {
            alert("Please login first")
		  navigate('/login');
		}
	  }, [user, navigate]);

      const handleLogout = () => {
		localStorage.removeItem("token");
		navigate('/login');
	};

    const inputRef = useRef(null);
    const dispatch=useDispatch();
    
    function startQuiz() {
        if(inputRef.current?.value){
            dispatchEvent(setUserId(inputRef.current?.value));
        }
    }

    if(user) {

  return (
    <div className='container'>
        <h1 className='title text-light'>Quiz Application</h1>
        <button style={styles} onClick={handleLogout}>
						Logout
					</button>

        <div className='box'>
            <Link to={'MCQ'} >
            <div class="card">
            <img src="https://mcqquestions.net/static/images/q-%26-a.webp" alt="Avatar" style={{width:'100%'}}/>
            </div>
            </Link>
            <Link to={'TrueFalse'} >
            <div class="card">
            <img src="https://mcqquestions.net/static/images/q-%26-a.webp" alt="Avatar" style={{width:'100%'}}/>
            </div>
            </Link>
            <Link to={'SingleWord'} >
            <div class="card">
            <img src="https://mcqquestions.net/static/images/q-%26-a.webp" alt="Avatar" style={{width:'100%'}}/>
            </div>
            </Link>
        </div>

        
        {/* <form id="form">
            <input ref={inputRef} className="userid" type="text" placeholder='Username*' />
        </form>

        <div className='start'>
            <Link className='btn' to={'quiz'} onClick={startQuiz}>Start Quiz</Link>
        </div> */}

    </div>
  )
    }
    else{
        return null
    }
}

export default Main
