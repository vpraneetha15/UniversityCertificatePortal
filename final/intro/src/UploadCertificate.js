import React, { useState } from 'react';
import axios from 'axios';

const UploadCertificate = ({ regNo }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('regNo', regNo);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('File uploaded successfully');
    } catch (error) {
      setMessage('File upload failed');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Certificate</button>
      <p>{message}</p>
    </div>
  );
};

export default UploadCertificate;
