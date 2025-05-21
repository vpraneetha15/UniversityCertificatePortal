import React, { useState } from 'react';
import './UpdateDetails.css';

const UpdateDetails = ({ regNo, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [year, setYear] = useState('');
  const [branch, setBranch] = useState('');
  const [section, setSection] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const details = { name, email, phone, year, branch, section };
    onSubmit(details);
  };

  return (
    <div className="update-details-container">
      <h2 style={{ color: 'black' }}>Update Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={{ color: 'black' }}>Reg No:</label>
          <input type="text" value={regNo} readOnly />
        </div>
        <div>
          <label style={{ color: 'black' }}>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label style={{ color: 'black' }}>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label style={{ color: 'black' }}>Phone Number:</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div>
          <label style={{ color: 'black' }}>Year:</label>
          <input type="text" value={year} onChange={(e) => setYear(e.target.value)} required />
        </div>
        <div>
          <label style={{ color: 'black' }}>Branch:</label>
          <input type="text" value={branch} onChange={(e) => setBranch(e.target.value)} required />
        </div>
        <div>
          <label style={{ color: 'black' }}>Section:</label><input type="text" value={section} onChange={(e) => setSection(e.target.value)} required />
        </div>
        <button type="submit">Update Details</button>
      </form>
    </div>
  );
};

export default UpdateDetails;