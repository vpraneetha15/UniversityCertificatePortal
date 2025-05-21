import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Registration.css';

const Registration = () => {
  const [regNo, setRegNo] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password,setpassword]=useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [year, setYear] = useState('');
  const [branch, setBranch] = useState('');
  const [section, setSection] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleRegister = async () => {
    // Validate that all fields are filled
    if (!regNo || !name || !email || !phoneNumber || !year || !branch || !section || !password) {
      alert('Please fill all the fields.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ regNo, name, email, phoneNumber, year, branch, section, password }),
      });
      
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage('Successfully registered! Redirecting to login page...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed');
    }
  };

  return (
    <div className="registration-container">
      <h2><center>Registration</center></h2>
      {successMessage ? (
        <p className="success-message">{successMessage}</p>
      ) : (
        <form className="registration-form">
          <label>Reg No:</label>
          <input type="text" value={regNo} onChange={(e) => setRegNo(e.target.value)} /><br /><br />
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} /><br /><br />
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} /><br /><br />
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br />
          <label>Phone Number:</label>
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} /><br /><br />
          <label>Year:</label>
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">Select Year</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select><br /><br />
          <label>Branch:</label>
          <select value={branch} onChange={(e) => setBranch(e.target.value)}>
            <option value="">Select Branch</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="AIML">AIML</option>
            <option value="AIDS">AIDS</option>
            <option value="CSC">CSC</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="MECH">MECH</option>
            <option value="CIVIL">CIVIL</option>
          </select><br /><br />
          <label>Section:</label>
          <input type="text" value={section} onChange={(e) => setSection(e.target.value)} /><br /><br />
          <button type="button" onClick={handleRegister}>Register</button>
        </form>
      )}
    </div>
  );
};

export default Registration;
