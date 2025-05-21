import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = ({ setUserType, setRegNo }) => {
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [studentUsername, setStudentUsername] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const [studentError, setStudentError] = useState('');

  const navigate = useNavigate();

  const handleAdminLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/admin/login', {
        username: adminUsername,
        password: adminPassword,
      });
      setAdminError('');
      setUserType('admin');
      navigate('/admin'); // Navigate to Admin Page
    } catch (error) {
      setAdminError('Incorrect username or password');
    }
  };

  const handleStudentLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/student/login', {
        username: studentUsername,
        password: studentPassword,
      });
      setStudentError('');
      setRegNo(response.data.regNo); // Set the registration number
      setUserType('student');
      navigate('/student'); // Navigate to Student Page
    } catch (error) {
      setStudentError('Incorrect username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={adminUsername}
          onChange={(e) => setAdminUsername(e.target.value)}
        /><br /><br />
        <input
          type="password"
          placeholder="Password"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
        /><br /><br />
        <button onClick={handleAdminLogin}>Login</button>
        {adminError && <p className="error">{adminError}</p>}
      </div>
      <div className="login-box">
        <h2>Student Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={studentUsername}
          onChange={(e) => setStudentUsername(e.target.value)}
        /><br /><br />
        <input
          type="password"
          placeholder="Password"
          value={studentPassword}
          onChange={(e) => setStudentPassword(e.target.value)}
        /><br /><br />
        <button onClick={handleStudentLogin}>Login</button>
        {studentError && <p className="error">{studentError}</p>}
        <p className="register-link" onClick={() => navigate('/register')}>Click here to register</p>
      </div>
    </div>
  );
};

export default Login;
