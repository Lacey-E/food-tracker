const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userProfileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isAlphanumeric(value),
      message: 'Username must contain only letters and numbers',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Invalid email address',
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isLength(value, { min: 8 }),
      message: 'Password must be at least 8 characters long',
    },
  },
  dietaryPreferences: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  age: {
    type: Number,
    validate: {
      validator: (value) => value >= 0,
      message: 'Age must be a positive number',
    },
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    default: 'other',
  },
  address: { type: String },
  phoneNumber: {
    type: String,
    validate: {
      validator: (value) => validator.isMobilePhone(value, 'any'),
      message: 'Invalid phone number',
    },
  },
});

// Hash the password before saving
userProfileSchema.pre('save', async function (next) {
  try {

    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(this.password, salt);
    // Replace the plain password with the hashed password
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
