const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const jwtAuthMiddleware = require('./middlewares/authentication');


dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  
  next();
});

// Initialize Passport
const passport = require('passport');
app.use(passport.initialize());

// // Configure OAuth2Strategy
const { Strategy: OAuth2Strategy } = require('passport-oauth2');

passport.use(
  new OAuth2Strategy(
    {
      // OAuth2 configuration
      authorizationURL: 'https://accounts.google.com/o/oauth2/v2/auth',
      tokenURL: 'https://oauth2.googleapis.com/token',
      clientID: process.env.CLIENTID,
      clientSecret: process.env.SECRET,
      callbackURL: process.env.CALLBACKURL,
      scope: ['email', 'profile'],
      accessType: 'offline',
      prompt: 'consent',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Custom logic to handle user authentication and saving user information
        const user = {
          id: profile.id,
          email: profile.email,
          accessToken,
          refreshToken,
        };

        // Pass the user and request/response objects to the next middleware or route handler
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);


// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
app.use(jwtAuthMiddleware);
app.use('/', require('./routes'));


app.use((err, req, res, next) => {
  // Error handling middleware
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});
// Connect to MongoDB and start the server
const { initDb } = require('./config/db');
initDb((err) => {
  if (err) {
    console.error('Failed to connect to MongoDB', err);
    return;
  }

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
