import React, { useRef,useEffect, useState } from 'react';
import Questions from './Questions';
import { useDispatch, useSelector } from 'react-redux';
import {Navigate} from 'react-router-dom'
import { useNavigate,useParams } from "react-router-dom"
import ProgressBar from './ProgressBar';

import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestions';
import { PushAnswer } from '../hooks/setResult';
import axios from 'axios';
import '../styles/App.css'
import '../styles/Quiz.css'
import Webcam from 'react-webcam';


function Quiz() {
  const styles = {
    color: "white",
    border: "5px solid black", 
    borderRadius: "50%", 
    width: "100px", 
    height: "100px",
    textAlign: "center",
    lineHeight: "100px",
    marginLeft:"0px",
    margin: "20px auto", 
    fontSize:"35px",
  };
  const stylesQ ={
    color: "white",
    fontSize:"30px",
    
  }

  // const WebcamCapture = () => {
    const webcamRef = useRef(null);
  
    function base64ToImage(base64String) {
      // Remove the data:image/png;base64, prefix
      var base64Image = base64String.replace(/^data:image\/(png|jpeg);base64,/, '');
    
      // Decode the Base64 string
      var binaryImg = atob(base64Image);
    
      // Create a typed array from the binary data
      var length = binaryImg.length;
      var arrayBuffer = new ArrayBuffer(length);
      var uint8Array = new Uint8Array(arrayBuffer);
      for (var i = 0; i < length; i++) {
          uint8Array[i] = binaryImg.charCodeAt(i);
      }
    
      // Create a Blob from the typed array
      var blob = new Blob([uint8Array], { type: 'image/jpeg' }); // Adjust the type accordingly
    
      // Create an Image object
      var img = new Image();
    
      // Set the image source to the Blob representing the decoded image
      img.src = URL.createObjectURL(blob);
    
      return img;
    }
  
  function base64ToBlob(base64) {
    const byteCharacters = atob(base64.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
  
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
  
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: "image/png" }); // Adjust the type based on your image format
  }
  
  
    useEffect(() => {
      const enableWebcam = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          const tracks = stream.getTracks();
  
          if (webcamRef.current) {
            webcamRef.current.video.srcObject = stream;
          }
  
          // Cleanup: Stop tracks when component unmounts
          return () => tracks.forEach(track => track.stop());
        } catch (error) {
          console.error('Error accessing webcam:', error);
        }
      };
  
      enableWebcam();
    }, []); // Run once on component mount
  
  var image;
  let screenshot;
  const [imageSrc, setImageSrc] = useState('');
  
  const captureAndUploadPhoto = async () => {
    if (webcamRef.current) {
      screenshot = webcamRef.current.getScreenshot();
      
      // const image = base64ToImage(screenshot);
      const image = base64ToBlob(screenshot);
      console.log(image);
      setImageSrc(image.src);
  
      const formData = new FormData();
      formData.append("image",image,"screenshot.png");
      
      const result = await axios.post(
        "http://localhost:8000/upload",
        formData,
        {
          headers : {"Content-Type": "multipart/form-data"},
        }
      );
      console.log(result.data);
    }
  }
  
  useEffect(() => {
      const intervalId = setInterval(captureAndUploadPhoto, 5000);
  
      return () => clearInterval(intervalId); // Cleanup on component unmount
    }, [captureAndUploadPhoto]);
// }

  const navigate = useNavigate();

  const redirectToResultPage = ()=>{
    alert('Time is up! Redirecting to the result page.');
    navigate('/result');
  }

  const [check,setChecked] = useState(undefined);
  const [progressWidth, setProgressWidth] = useState(0); 

  const [quizTime, setQuizTime] = useState(30);  // SET QUIZ TIME HERE
  const [questionTime, setQuestionTime] = useState(10);  //SET QUESTION TIME HERE

  const {id}=useParams();
  console.log(id);

  const getData = async () =>{
    const response = await axios.get(`http://localhost:8000/api/quiz/one/${id}`);
    if(response.data == null ){
      alert("The quiz cannot be accessed within this window");
      navigate("/");
    } 
  }
  getData();

  useEffect(() => {
    const quizTimerInterval = setInterval(() => {
      if (quizTime === 0) {
        clearInterval(quizTimerInterval);
        // alert('Time is up! Redirecting to the result page.');
        // navigate('/result')
        redirectToResultPage();
      } else {
        setQuizTime(quizTime - 1);
      }
    }, 1000);

    const questionTimerInterval = setInterval(() => {
      if (questionTime === 0) {
        clearInterval(questionTimerInterval);
        onNext();
      } else {
        setQuestionTime(questionTime - 1);
      }
    }, 1000);

    return () => {
      clearInterval(quizTimerInterval);
      clearInterval(questionTimerInterval);
    };
  }, [quizTime, questionTime]);

  
  const { queue , trace} = useSelector(state => state.questions);
  const {result} = useSelector(state => state.result);
  const dispatch = useDispatch();

  useEffect(() => {
    setProgressWidth(((trace+1) / queue.length) * 100);
  }, [trace, queue.length]);

function onNext(){
  console.log('On next click');
  setQuestionTime(10);    //AGAIN RESET THE QUESTION TIME
  if(trace < queue.length){
    dispatch(MoveNextQuestion());
    if(result.length <= trace)
    dispatch(PushAnswer(check));
  }

  setChecked(undefined);
}

function onPrev(){
  console.log('On prev click');
  if(trace > 0)
  dispatch(MovePrevQuestion());
}

function onChecked(check){
  console.log(check);
  setChecked(check);
}


if(result.length && result.length>=queue.length){
  return <Navigate to={`/quiz/${id}/:userId/result`} replace={true}></Navigate>
}

  return (
    <div className='webdiv'>
    <div className='container'>
        <h1 className='title text-light'>Quiz Application</h1>
        <div className='clocks'>
        <div style={styles} id="quiz-timer">{Math.floor(quizTime / 60)}:{quizTime % 60}</div>
        <div style={stylesQ} id="question-timer">Question Time: {Math.floor(questionTime / 60)}:{questionTime % 60}</div>
        </div>
        {/* display questions */}
        <ProgressBar width={progressWidth} />
        
        <Questions onChecked={onChecked} quizId={id}/>

        <div className='grid'>
            {trace>0?<button className='btn prev' onClick={onPrev}>Prev</button>:<div></div>}
            <button className='btn next' onClick={onNext}>Next</button>
        </div>
    </div>
    <div>
      <Webcam
        className = 'webcam'
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
        videoConstraints={{ facingMode: 'user' }}
      />
    </div>
    </div>
  )
}

export default Quiz