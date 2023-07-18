// Load environment variables from the .env file
const dotenv = require('dotenv');
dotenv.config();

// Import the MongoDB client
const MongoClient = require('mongodb').MongoClient;

// Get the MongoDB connection URI from the environment variables
const uri = process.env.MONGODB_URI;

// Define a variable to hold the MongoDB client connection
let _db;

// Function to initialize the database connection
const initDb = (callback) => {
  // Check if the database connection is already initialized
  if (_db) {
    console.log('Db is already initialized!');
    // If already initialized, return the existing connection
    return callback(null, _db);
  }

  // Check if the MongoDB URI is defined in the environment variables
  if (!uri) {
    console.log('MONGODB_URI is not defined in .env');
    // If the URI is not defined, return an error
    return callback('Missing environment variable MONGODB_URI');
  }

  // Connect to the MongoDB database using the MongoClient
  MongoClient.connect(uri)
    .then((client) => {
      // Store the client connection in the _db variable
      _db = client;
      // Return the client connection to the callback function
      callback(null, _db);
    })
    .catch((err) => {
      // Handle errors that occur during database connection
      console.log('Error connecting to database:', err);
      // Return the error to the callback function
      callback(err);
    });
};

// Function to get the database connection
const getDb = () => {
  // Check if the database connection is initialized
  if (!_db) {
    // If not initialized, throw an error
    throw Error('Db not initialized');
  }
  // If initialized, return the database connection
  return _db;
};

// Export the functions so they can be used in other parts of the application
module.exports = {
  initDb,
  getDb,
};
