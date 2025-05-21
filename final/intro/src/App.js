import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './Home';
import AboutUs from './AboutUs';
import Login from './Login';
import StudentPage from './StudentPage';
import AdminPage from './AdminPage';
import Registration from './Registration'; // Import the Registration component
import './App.css';

const MainApp = () => {
  const [userType, setUserType] = useState(null);
  const [regNo, setRegNo] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserType(null);
    setRegNo('');
    navigate('/');
  };

  return (
    <div className="App">
      <h1>Welcome to the University Certificate Portal</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li>
            {userType === null ? (
              <Link to="/login">Login</Link>
            ) : (
              <button onClick={handleLogout}>Logout</button>
            )}
          </li>
        </ul>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route 
            path="/login" 
            element={<Login setUserType={setUserType} setRegNo={setRegNo} />} 
          />
          <Route path="/register" element={<Registration />} /> {/* Add the Registration route */}
          {userType === 'admin' && (
            <Route path="/admin" element={<AdminPage />} />
          )}
          {userType === 'student' && (
            <Route 
              path="/student" 
              element={<StudentPage regNo={regNo} setUserType={setUserType} />} 
            />
          )}
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

export default App;
