// PhotoGallery.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/photos');
        setPhotos(response.data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div>
      <h2>Photo Gallery</h2>
      {photos.map(photo => (
        <div key={photo._id}>
          {/* Use btoa to convert binary data to base64 */}
          <img
          src={`data:${photo.contentType};base64,${photo.data}`}
          alt={`Photo ${photo._id}`}
          width="200"
          height="150"
        />

        </div>
      ))}
    </div>
  );
};

export default PhotoGallery;
