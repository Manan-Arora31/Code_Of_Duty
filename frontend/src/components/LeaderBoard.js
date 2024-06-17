import React, { useEffect, useState } from 'react';
import './Leaderboard.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
//import { response } from 'express';

const dData = [
    { rank: 1, name: 'Alice', score: 95 },
    { rank: 2, name: 'Bob', score: 90 },
    { rank: 3, name: 'Charlie', score: 85 },
    { rank: 4, name: 'Diana', score: 80 },
    { rank: 5, name: 'Eve', score: 75 }
];


    //const response = await axios.get(``);
        
        // .then(response => response.json())
        // .then(data => console.log('Quiz result saved:', data))
        // .catch(error => console.error('Error saving quiz result:', error));
        

const Leaderboard = () => {

    const navigate= useNavigate();
const {id}=useParams();
  console.log(id);
  const [leaderboardData,setLeaderboardData] = useState(null);
  //setLeaderboardData([]);

useEffect(()=> {
const getData = async () =>{
    
    const response = await axios.get(`http://localhost:8000/api/quizResult/quiz_leaderboard/${id}`);
    if(response.data == null ){
      alert("The leaderboard cannot be accessed within this window");
      navigate("/");
    }
    setLeaderboardData(response.data); 
    console.log(response.data);
  }
  getData();
},[leaderboardData]);

const handleBack = () => {
    navigate("/");
  }
    return (
        <div className="leaderboard-container">
            <button onClick={handleBack}>Home</button>
            <h1 className="leaderboard-title">Quiz Leaderboard</h1>
            <table className="leaderboard-table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    { leaderboardData!=null && leaderboardData.map((entry,i) => (
                        <tr key={i+1}>
                            <td>{i+1}</td>
                            <td>{entry.userId.firstName}</td>
                            <td>{entry.totalMarks}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
