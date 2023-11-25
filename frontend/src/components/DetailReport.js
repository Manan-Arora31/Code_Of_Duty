import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../styles/DetailReportPage.css'; 

const DetailReportPage = () => {
  const { questions: { queue, answers }, result: { result } } = useSelector(state => state);
  
  
  return (
    <div className="detail-report-container">
      <h2>Detailed Report</h2>
      <ul className="question-list">
        {queue.map((question, index) => (
          <li key={index} className="question-item">
            <div className='question-number'>Q{index+1}</div><p className="question-text">{question.text}</p>
            <div className="options">
              <p>Options: {question.options.join(', ')}</p>
               
              <p className={`selected-answer ${result[index] === answers[question.correctOption] ? 'equal' : 'not-equal'}`}>Selected Answer: {question.options[result[index]]}</p>
              <p className="correct-answer">Correct Answer: {question.options[answers[question.correctOption]]}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetailReportPage;
