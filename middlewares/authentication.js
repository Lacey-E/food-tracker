const jwt = require('jsonwebtoken');

// JWT Secret Key
const jwtSecret = process.env.SECRET_KEY; // Replace with a secure secret key

// Middleware to generate JWT
const generateJWT = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    // Add other user data you want to include in the JWT payload
  };

  const options = {
    expiresIn: '1h', // Token expiration time (e.g., 1 hour)
  };

  return jwt.sign(payload, jwtSecret, options);
};

module.exports = generateJWT;
