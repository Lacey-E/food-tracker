const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const STATE = uuidv4(); // Generate a random state value

const exchangeCodeForToken = async (code, state) => {
  // Verify the state parameter to prevent CSRF attacks
  if (state !== STATE) {
    res.status(400).send('Invalid state parameter');
    return;
  }
  try {
    const response = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
  
    });

    return response.data.access_token;
  } catch (error) {
    throw new Error('Failed to exchange code for access token');
  }
};

const getUserData = async (accessToken) => {
  try {
    const response = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to get user data');
  }
};

module.exports = {
  exchangeCodeForToken,
  getUserData
};