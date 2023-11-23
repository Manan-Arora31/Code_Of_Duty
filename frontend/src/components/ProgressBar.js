import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ProgressBar.css';

const ProgressBar = ({ width }) => {
 
  console.log("p");
  console.log(width);

  return (
    <div className="progress-bar-container" >
    <div className="progress-bar" style={{width: `${width}%`}} ></div>
    </div>
  );
};



export default ProgressBar;
