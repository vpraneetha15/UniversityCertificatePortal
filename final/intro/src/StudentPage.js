import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentPage.css';

const StudentPage = ({ regNo, setUserType }) => {
  const [uploadedCertificates, setUploadedCertificates] = useState([]);
  const [error, setError] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showUpdateDetails, setShowUpdateDetails] = useState(true); // Set to true for first login
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    // Ensure regNo is available and fetch certificates
    if (regNo) {
      axios.get('http://localhost:5000/certificates', { params: { regNo } })
        .then(response => {
          setUploadedCertificates(response.data);
        })
        .catch(error => {
          console.error('Error fetching certificates:', error);
        });
    }
  }, [regNo]); // Fetch certificates when regNo changes

  const handleUpload = async (event) => {
    const files = Array.from(event.target.files);
    const pdfFiles = files.filter(file => file.type === 'application/pdf');

    if (pdfFiles.length !== files.length) {
      setError('Only PDF files are allowed.');
    } else {
      setError('');
      const formData = new FormData();
      pdfFiles.forEach(file => {
        formData.append('files', file);
      });
      formData.append('regNo', regNo); // Send regNo with the upload request

      try {
        const response = await axios.post('http://localhost:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        // Update state with new certificates
        setUploadedCertificates(prev => [...prev, ...response.data.files]);
      } catch (error) {
        console.error('Error uploading files:', error);
        setError('Failed to upload files. ' + (error.response ? error.response.data.message : ''));
      }
    }
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmNewPassword) {
      setPasswordError('New passwords do not match.');
    } else {
      alert('Password changed successfully.');
      setShowChangePassword(false);
    }
  };

  const handleDetailsSubmit = (details) => {
    console.log(details);
    setShowUpdateDetails(false);
  };

  return (
    <div className="student-page-container">
      <div className="header">
        <div className="welcome-box">
          <h2>Welcome, {regNo}</h2>
        </div>
      </div>
      <div className="content">
        <div className="upload-section">
          <p className="upload-instruction">Please upload the file with the certification name as the name of the course </p>
          <button className="upload-btn" onClick={() => document.getElementById('fileInput').click()}>
            Upload Certificate
          </button>
          <input
            id="fileInput"
            type="file"
            style={{ display: 'none' }}
            multiple
            accept="application/pdf"
            onChange={handleUpload}
          />
          {error && <p className="error">{error}</p>}
        </div>
        <div className="certificates-box">
          <h3>Uploaded Certificates</h3>
          <ul>
            {uploadedCertificates.length > 0 ? (
              uploadedCertificates.map((file, index) => (
                <li key={index}>
                  {file.name} <a href={file.url} download={file.name}><button>Download</button></a>
                </li>
              ))
            ) : (
              <p>No certificates uploaded yet.</p>
            )}
          </ul>
        </div>
      </div>

      <div className="sidebar-buttons">
        <button onClick={() => setShowChangePassword(true)}>Change Password</button>
      </div>

      {showChangePassword && (
        <div className="modal" align="center">
          <div className="modal-content">
            <h2>Change Password</h2>
            <label>Current Password: </label>
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            /><br /><br />
            <label>New Password: </label>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            /><br /><br />
            <label>Confirm New Password:</label>
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            /><br /><br />
            {passwordError && <p className="error">{passwordError}</p>}
            <button className="modal-btn" onClick={handleChangePassword}>Change</button><br /><br />
            <button className="modal-btn" onClick={() => setShowChangePassword(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentPage;
