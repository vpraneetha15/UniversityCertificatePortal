const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const User = require('./models/User');
const Certificate = require('./models/Certificate');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/university_portal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.log('Failed to connect to MongoDB', err);
});

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Admin login route
app.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await User.findOne({ username, password, userType: 'admin' });
  if (admin) {
    res.status(200).json({ message: 'Admin login successful' });
  } else {
    res.status(401).json({ message: 'Incorrect username or password' });
  }
});

// Student login route
app.post('/student/login', async (req, res) => {
  const { username, password } = req.body;
  const student = await User.findOne({ username, password, userType: 'student' });
  if (student) {
    res.status(200).json({ message: 'Student login successful', regNo: student.username });
  } else {
    res.status(401).json({ message: 'Incorrect username or password' });
  }
});

// Certificate upload route
app.post('/upload', upload.array('files'), async (req, res) => {
  try {
    const files = req.files;
    const { regNo } = req.body;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded.' });
    }

    const student = await User.findOne({ username: regNo, userType: 'student' });
    if (!student) {
      return res.status(400).json({ message: 'Student not found.' });
    }

    const fileMetadata = files.map(file => {
      const courseName = path.basename(file.originalname, path.extname(file.originalname)); // Extract course name
      return {
        name: file.originalname,
        path: file.path,
        url: `http://localhost:${port}/uploads/${file.filename}`,
        uploadedBy: student._id,
        courseName // Ensure courseName is included here
      };
    });

    // Save metadata to MongoDB
    await Certificate.insertMany(fileMetadata);

    res.status(200).json({ files: fileMetadata });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).json({ message: 'Failed to upload files', error: error.message });
  }
});

// Fetch certificates by regNo for student
app.get('/certificates', async (req, res) => {
  try {
    const { regNo } = req.query;

    if (!regNo) {
      return res.status(400).json({ message: 'Registration number is required' });
    }

    // Find student by regNo
    const student = await User.findOne({ username: regNo, userType: 'student' });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Find certificates uploaded by the student
    const certificates = await Certificate.find({ uploadedBy: student._id });
    res.status(200).json(certificates);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    res.status(500).json({ message: 'Failed to fetch certificates', error: error.message });
  }
});

// Fetch all certificates for admin by course name
app.get('/all-certificates', async (req, res) => {
  try {
    const { courseName } = req.query;

    if (!courseName) {
      return res.status(400).json({ message: 'Course name is required' });
    }

    // Find certificates by course name
    const certificates = await Certificate.find({ courseName }).populate('uploadedBy', 'username');
    res.status(200).json(certificates);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    res.status(500).json({ message: 'Failed to fetch certificates', error: error.message });
  }
});



app.post('/register', async (req, res) => {
  const { regNo, name, email, phoneNumber, year, branch, section, password } = req.body;

  try {
    // Check if the registration number already exists
    const existingUser = await User.findOne({ username: regNo });
    if (existingUser) {
      return res.status(400).json({ message: 'Registration number already exists' });
    }

    // Create a new user
    const newUser = new User({
      username: regNo,
      password,
      userType: 'student',
      email,
      phoneNumber,
      name,
      year,
      branch,
      section,
    });

    // Save the new user
    await newUser.save();
    res.status(201).json({ message: 'Student registered successfully' });
  } catch (error) {
    // Log detailed error
    console.error('Error registering student:', error);
    res.status(500).json({ message: 'Failed to register student', error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
