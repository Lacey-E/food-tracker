const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dietaryPreferences: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  age: { type: Number },
  gender: { type: String },
  address: { type: String },
  phoneNumber: { type: String },
  // additional user-specific fields
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
