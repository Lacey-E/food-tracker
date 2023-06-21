const express = require('express'); // Framework for building web applications
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
// const mongoose = require('mongoose'); // MongoDB object modeling tool
const { initDb } = require('./config/db.config')
const app = express();
const PORT = process.env.PORT || 3000; // Use the environment variable PORT if available, or default to port 3000

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies


app.use((req, res, next) => {
    // Set response headers to allow cross-origin resource sharing (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  });

app.use('/', require('./routes'));

// Connect to MongoDB and start the server
initDb((err) => {
  if (err) {
    console.error('failed to connect to MongoDb', err);
    return;
  }

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});


