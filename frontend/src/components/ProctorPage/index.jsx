// App.js
import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';



const WebcamCapture = () => {
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


  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
        videoConstraints={{ facingMode: 'user' }}
      />
      <button onClick={captureAndUploadPhoto}>Capture and Upload Photo</button>
      {imageSrc && <img src={imageSrc} alt="Base64 Image" />}
    </div>
  );
};

export default WebcamCapture;
