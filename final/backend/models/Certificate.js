const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const certificateSchema = new Schema({
  name: String,
  path: String,
  url: String,
  uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  courseName: String // Added courseName
});

const Certificate = mongoose.model('Certificate', certificateSchema);
module.exports = Certificate;
