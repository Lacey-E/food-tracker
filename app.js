const express = require('express'); // Framework for building web applications
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const mongoose = require('mongoose'); // MongoDB object modeling tool
// const { initDb } = require('./config/db')
const connectDB = require('./config/db')
const app = express();
const passport = require('passport')
const googlePassport = require('./config/google-passport')
const githubPassport = require('./config/github-passport')
googlePassport(passport)
githubPassport(passport)
const error = require('http-errors')
const error404 = require('./controllers/errorHandling');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session)
const Port = process.env.PORT || 3000; // Use the environment variable PORT if available, or default to port 3000

// Middleware
app.use(session({
  secret: process.env.my_secret,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}))

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send(`<h1>Welcome to Food-Tracker App</h1>`)
})

app.use(bodyParser.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json())


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
app.use(error404.notFound)
app.use(error404.handleErrors)

// Connect to MongoDB and start the server
// initDb((err) => {
//   if (err) {
//     console.error('failed to connect to MongoDb', err);
//     return;
//   }

//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// });

app.use((req, res, next) => {
  next(createError(404, 'Router not found!'))
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
      error: {
          status: err.status || 500,
          message: err.message
      }
  })
})

connectDB()

app.listen(Port, () => {
  console.log(`Port running on server ${Port}`)
});
