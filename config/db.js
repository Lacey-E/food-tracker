const mongoose = require('mongoose');
require('dotenv').config();

const db = async () => {
    let connect;
    try{
        connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log('DB connection successful!!!')
    }catch(err){
        console.log('Problem with database connection. Check and try again!!!');
        console.log(err)
    }
}


module.exports = db;

// const dotenv = require('dotenv');
// dotenv.config();

// const MongoClient = require('mongodb').MongoClient;

// const uri = process.env.MONGODB_URI;

// let _db;

// const initDb = (callback) => {
//   if (_db) {
//     console.log('Db is already initialized!');
//     return callback(null, _db);
//   }

//   if (!uri) {
//     console.log('MONGODB_URI is not defined in .env');
//     return callback('Missing environment variable MONGODB_URI');
//   }

//   MongoClient.connect(uri)
//     .then((client) => {
//       _db = client;
//       callback(null, _db);
//     })
//     .catch((err) => {
//       console.log('Error connecting to database:', err);
//       callback(err);
//     });
// };

// const getDb = () => {
//   if (!_db) {
//     throw Error('Db not initialized');
//   }
//   return _db;
// };

// module.exports = {
//   initDb,
//   getDb,
// };
