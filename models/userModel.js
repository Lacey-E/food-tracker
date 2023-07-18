const mongoose = require('mongoose');

const userProfileSchema = mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String },
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
