const express = require('express'); // Framework for building web applications
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const mongoose = require('mongoose'); // MongoDB object modeling tool

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

// Connect to MongoDB
mongoose.connect('mongodb+srv://laurels:Laurels81156357.@food-tracker-cluster.u3r5dx2.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server after successfully connecting to the database
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// API routes for testing
app.get('/api/users', (req, res) => {
  res.json({ message: 'API is working!' });
});
