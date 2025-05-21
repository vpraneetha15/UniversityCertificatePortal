# 🎓 University Certificate Management System

A full-stack web application designed to streamline the management and verification of student certificates in a university setting. This platform provides separate interfaces for *students* and *administrators*, enabling secure uploading, viewing, and management of academic certificates.

---

## 🚀 Features

- 👨‍🎓 *Student Portal*
  - Secure login & password management
  - Upload certificates (PDF/image)
  - View/download uploaded certificates

- 🧑‍💼 *Admin Panel*
  - Admin authentication
  - Search certificates by course name
  - View/download certificates submitted by students
  - Centralized certificate tracking

- 🔐 *Authentication*
  - Secure login using JWT (JSON Web Tokens)
  - Role-based access control (Student/Admin)

---

## 🛠 Tech Stack

| Layer       | Technology         |
|-------------|--------------------|
| Frontend    | React.js, CSS      |
| Backend     | Node.js, Express.js|
| Database    | MongoDB (with MongoDB Atlas) |
| File Storage| Local server-side uploads |
| Tools       | Postman, MongoDB Compass |

---

## 📁 Folder Structure

UniversityCertificatePortal/
└── final/
    └── Certificate Management/
        ├── src/
        │   └── com/
        │       └── certificate/
        │           ├── controller/
        │           │   ├── LoginServlet.java
        │           │   ├── RegisterServlet.java
        │           │   ├── UploadCertificateServlet.java
        │           │   └── ViewCertificatesServlet.java
        │           ├── model/
        │           │   └── DBConnection.java
        │           └── beans/
        │               └── User.java
        │
        ├── WebContent/
        │   ├── css/
        │   │   └── style.css
        │   ├── js/
        │   │   └── script.js
        │   ├── images/
        │   │   └── logo.png
        │   ├── certificates/ (uploaded certificate files)
        │   ├── login.jsp
        │   ├── register.jsp
        │   ├── dashboard.jsp
        │   ├── upload.jsp
        │   └── view.jsp
        │
        ├── WEB-INF/
        │   ├── web.xml (deployment descriptor)
        │
        └── README.md



---

## 🔧 Setup Instructions

### Prerequisites

- Node.js & npm installed
- MongoDB Atlas account
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/university-certificate-management-system.git
cd university-certificate-management-system

2. Setup Backend

cd server
npm install
Create a .env file inside server

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

npm start

3. Setup Frontend
cd client
npm install
npm start
The React app will start at http://localhost:3000
