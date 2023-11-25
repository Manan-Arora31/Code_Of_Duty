import { Link,useNavigate } from 'react-router-dom';
import React, { useRef, useEffect } from 'react'
import quiz from './Quiz';
import MCQ from './MCQ';
import TrueFalse from './TrueFalse';
import SingleWord from './SingleWord';
import '../styles/Main.css'
import { setUserId,setUsername} from '../redux/result_reducer';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import logo from '../images/logo.jpeg';

function Main() {

    const styles = {
        border: 'none',
        outline: 'none',
        padding: '12px 0',
        backgroundColor: 'light blue',
        borderRadius: '20px',
        width: '120px',
        fontWeight: 'bold',
        fontSize: '14px',
        cursor: 'pointer',
        marginRight: '20px',
      };

    const navigate = useNavigate();
	//const user = localStorage.getItem("token");
    const tok= localStorage.getItem('token');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
              // Get the JWT token from wherever you stored it (e.g., localStorage)
              const token = localStorage.getItem('token');
      
              if (!token) {
                // Handle the case where the token is not available
                console.error('Token not found');
                navigate('/login');
                return;
              }
      
              // Send a request to the backend with the token in the Authorization header
              const response = await axios('http://localhost:8000/api/users/profile', {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              });
      
              if (response) {
                // Parse and set the user information
                const userId = response.data.id;
                const fname=response.data.fname;
                console.log(response.data);
                console.log(userId);
                dispatch(setUserId(userId));
                dispatch(setUsername(fname));
              } else {
                // Handle errors from the backend
                console.error('Error fetching user data:', response.status);
              }
            } catch (error) {
              console.error('Error:', error);
            }
          };
      
          fetchUserData();
        }, []);

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

    if(tok) {

  return (
    <div className='container'>
        <h1 className='title text-light'> Quiz Application</h1>
        <button  onClick={handleLogout}>
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
            <img src="https://img.freepik.com/premium-vector/true-false-label-sign-check-mark-cross_123447-5530.jpg" alt="Avatar" style={{width:'100%'}}/>
            </div>
            </Link>
            {/* <Link to={'SingleWord'} >
            <div class="card">
            <img src="https://mcqquestions.net/static/images/q-%26-a.webp" alt="Avatar" style={{width:'100%'}}/>
            </div>
            </Link> */}
        </div>

    </div>
    
  )
    }
    else{
        return null
    }
}

export default Main
