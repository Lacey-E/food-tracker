const generateJWT = require('../middlewares/authentication');

// Assuming you have a User model for handling user data and authentication
const User = require('../models/userModel');

// Controller for user login
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Validate the password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Generate JWT token
    const token = generateJWT(user);

    // Send the token as a response
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error.' });
  }
};

const logoutUser = (req, res) => {
    // On the client-side, you can clear the token from storage (e.g., localStorage)
    // In this example, we're just sending a success response
    res.status(200).json({ message: 'Logout successful.' });
  };

module.exports = { loginUser, logoutUser };
