const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true, enum: ['admin', 'student'] },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  name: { type: String, required: true },
  year: { type: String, required: true },
  branch: { type: String, required: true },
  section: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
