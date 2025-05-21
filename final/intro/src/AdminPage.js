import React, { useState } from 'react';
import axios from 'axios';
import './AdminPage.css';

const AdminPage = () => {
  const [courseName, setCourseName] = useState('');
  const [filteredCertificates, setFilteredCertificates] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = async () => {
    if (!courseName) {
      alert('Please enter a course name.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/all-certificates?courseName=${courseName}`);
      if (Array.isArray(response.data)) {
        setFilteredCertificates(response.data);
      } else {
        console.error('Unexpected response format:', response.data);
        setFilteredCertificates([]);
      }
      setSearchPerformed(true);
    } catch (error) {
      console.error('Error fetching certificates:', error);
      setFilteredCertificates([]);
      setSearchPerformed(true);
    }
  };

  return (
    <div className="admin-page-container">
      <div className="welcome-box">
        <h2>Welcome Admin</h2>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
      </div>
      <div className="search-button">
        <button onClick={handleSearch}>Search</button>
      </div>
      <br />
      <div className="results-container">
        {searchPerformed && filteredCertificates.length === 0 ? (
          <p>No certificates found.</p>
        ) : (
          filteredCertificates.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Reg No</th>
                  <th>Certificate</th>
                </tr>
              </thead>
              <tbody>
                {filteredCertificates.map((certificate, index) => (
                  <tr key={index}>
                    <td>{certificate.uploadedBy ? certificate.uploadedBy.username : 'N/A'}</td>
                    <td>
                      <a href={certificate.url} target="_blank" rel="noopener noreferrer">
                        <button>View   </button>
                      </a>
                      <a href={certificate.url} download>
                        <button>Download</button>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
      </div>
    </div>
  );
};

export default AdminPage;
