const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }

  if (!uri) {
    console.log('MONGODB_URI is not defined in .env');
    return callback('Missing environment variable MONGODB_URI');
  }

  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((client) => {
      _db = client; // Access the database using the `db()` method
      callback(null, _db);
    })
    .catch((err) => {
      console.log('Error connecting to database:', err);
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb
};
