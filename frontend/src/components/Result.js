import React, { useEffect } from 'react'
import '../styles/Result.css';
import { Link, useNavigate } from 'react-router-dom';

import ResultTable from './ResultTable';
import { useDispatch, useSelector } from 'react-redux';
import { attempts_Number, earnPoints_Number, flagResult } from '../helper/helper';

/** import actions  */
import { resetAllAction } from '../redux/questions_reducer';
import { resetResultAction } from '../redux/result_reducer';

// import { usePublishResult } from '../hooks/setResult';
import html2canvas from "html2canvas"
import jsPDF from "jspdf"


export default function Result() {

    const downloadPdf = () => {
        const content = document.getElementById('pdf-content'); // Replace with the ID of the element you want to convert to PDF
    
        html2canvas(content).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save('download.pdf');
        });
      };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { questions : {quizId, queue ,answers}, result : { result, username,userId}}  = useSelector(state => state)

    const totalPoints = queue.length * 10; 
    const attempts = attempts_Number(result);
    const earnPoints = earnPoints_Number(result, answers, 10)
    const flag = flagResult(totalPoints, earnPoints)
    // console.log(answers);
    // console.log(result);
    // console.log(userId); 
    // console.log(quizId);   
   
    // Storing the result in backend;

    const quizResultData={
        quizId:quizId,
        userId:userId,
        selectedAnswer:result,
        totalMarks:earnPoints
    }

    const handleBack = () => {
        navigate("/");
      }

    fetch('http://localhost:8000/api/quizResult/save', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(quizResultData),
})
    .then(response => response.json())
    .then(data => console.log('Quiz result saved:', data))
    .catch(error => console.error('Error saving quiz result:', error));

    /** store user result */
    // usePublishResult({ 
    //     result, 
    //     username : userId,
    //     attempts,
    //     points: earnPoints,
    //     achived : flag ? "Passed" : "Failed" });

    function onDetailReport(){

    }

    function onRestart(){
        dispatch(resetAllAction())
        dispatch(resetResultAction())
    }

  return (
    <div className = "outer">
    <div id='pdf-content' className='container'>
    <button onClick={handleBack}>back</button>
        <h1 className='title text-light'>Quiz Application</h1>

        <div className='result flex-center '>
            <div className='flex'>
                <span>Username</span>
                <span className='details'>{username|| ""}</span>
            </div>
            <div className='flex'>
                <span>Total Quiz Points : </span>
                <span className='details'>{totalPoints || 0}</span>
            </div>
            <div className='flex'>
                <span>Total Questions : </span>
                <span className='details'>{ queue.length || 0}</span>
            </div>
            <div className='flex'>
                <span>Total Attempts : </span>
                <span className='details'>{attempts || 0}</span>
            </div>
            <div className='flex'>
                <span>Total Earn Points : </span>
                <span className='details'>{earnPoints || 0}</span>
            </div>
            <div className='flex'>
                <span>Quiz Result</span>
                <span style={{ color : `${flag ? "#2aff95" : "#ff2a66" }` }} className='bold'>{flag ? "Passed" : "Failed"}</span>
            </div>
        </div>
        <div className='start'>
        {/* <div className="restart">
            <Link className='btn' to={'/'} onClick={onRestart}>Restart</Link>
        </div> */}
        <div className="restart">
            <Link className='btn' to={'/quiz/:id/:userId/result/detailReport'} onClick={onDetailReport}>DetailReport</Link>
        </div>
        </div>

        {/* <div className="container">
           
            <ResultTable></ResultTable>
        </div> */}
    </div>
    <button className="download" onClick = {downloadPdf}>Download PDF</button>
    </div>
  )
}
