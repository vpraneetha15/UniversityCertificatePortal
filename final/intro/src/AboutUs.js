import React from 'react';
import './AboutUs.css'; // Import the CSS file for styling

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1 className="about-us-heading">About Us</h1>
      <p className="about-us-paragraph">
        Welcome to the University Certificate Management System, a cutting-edge application designed to streamline the management and maintenance of student certificates online. We understand that certificates can be misplaced, and our system is here to offer a reliable solution. UCMS allows institutions to effortlessly manage certificates and enables students to upload and access their credentials with ease.
      </p>
      <p className="about-us-paragraph">
        Our platform aims to replace outdated manual processes with an efficient computerized system, ensuring that valuable data is stored securely and can be easily accessed and manipulated as needed. With UCMS, authorized users can access their certificates anytime and from anywhere in the world.
      </p>
      <p className="about-us-paragraph">
        Our goal is to enhance the performance and services of educational institutions by automating certificate management. This not only reduces errors and ensures data security but also allows organizations to focus on other critical activities while maintaining accurate and up-to-date records. By minimizing redundant entries and improving data accessibility, UCMS helps institutions make better use of their resources and provides a seamless experience for both administrators and students.
      </p>
    </div>
  );
}

export default AboutUs;
