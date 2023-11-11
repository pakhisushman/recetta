import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import './fromimage.css';

// Add the imported icon to the FontAwesome library
library.add(faUpload);

export const FromImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [category, setCategory] = useState('');
  const [probability, setProbability] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const classifyImage = async () => {
    if (!selectedFile) {
      alert('Please select an image to classify.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);

    const apiKey = '783b321a40d848cdbbc0ef32e772fef2';

    try {
      const response = await fetch('https://api.spoonacular.com/food/images/classify', {
        method: 'POST',
        headers: {
          'X-API-Key': apiKey,  // Set your API key here
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setCategory(data.category);
        setProbability(data.probability);
      } else {
        alert('Failed to classify the image. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while classifying the image.');
    } finally {
      setLoading(false);
    }
  };
const handleRefresh = () => {
    setSelectedFile(null);
    setCategory('');
    setProbability('');
  };

  return (
    <div className='fromimagebody'>
      <div className='fromimagecontainer'>
        <div className='fromimagebox'>
          <h2 className='head' style={{ color: 'white', fontSize: '2.5rem' }}>Image Classification</h2>
          <input type="file" id="actual-btn" accept="image/*" hidden onChange={handleFileChange} />
          <label htmlFor="actual-btn" style={{ display: 'inline-block', marginRight:'4rem' }}>
            <FontAwesomeIcon icon={faUpload} />
          </label>
          {selectedFile && (
            <div>
              <h3 style={{ color: 'white' }}>Selected Image</h3>
              <img src={URL.createObjectURL(selectedFile)} alt="Selected" style={{ width: '200px', height: '200px' }} />
            </div>
          )}
          <button onClick={classifyImage} disabled={loading} style={{marginRight:'1rem'}}>
            Classify Image
          </button>
          <button onClick={handleRefresh}>Refresh</button>
          {loading && <p>Classifying...</p>}
          {category && probability && (
            <div>
              <h3 style={{ color: 'black', fontSize:'1rem', fontFamily:'sans-serif' }}>Classification Result</h3>
              <p style={{ color: 'white', fontSize:'1rem', fontFamily:'sans-serif' }}>Category: {category}</p>
              <p style={{ color: 'white', fontSize:'1rem', fontFamily:'sans-serif' }}>Probability: {probability}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FromImage;
