const express = require('express'); // Framework for building web applications
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
// const mongoose = require('mongoose'); // MongoDB object modeling tool
const { initDb } = require('./config/db')
const axios = require('axios');
const session = require('express-session');
const app = express();


const PORT = process.env.PORT || 3000; // Use the environment variable PORT if available, or default to port 3000

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use(session({
    secret: process.env.GITHUB_CLIENT_SECRET,
    resave:false,
    saveUninitialized:true
}))



app.get('/login', (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&prompt=consent`);
})

app.get('/github/callback', (req, res) => {
    const {code}= req.query
    const body = {client_id: process.env.GITHUB_CLIENT_ID, client_secret: process.env.GITHUB_CLIENT_SECRET, code}
    const opts = {headers: {accept: 'application/json'}}
    axios.post("https://github.com/login/oauth/access_token", body, opts)

    .then((_res) => {

      req.session.token = _res.data.access_token;

      console.log("My token:", req.session.token);


      // Redirect to the desired route after successful authentication

      res.redirect(`/api-docs`);

    })

    .catch(err => res.status(500).json({ message: err.message }));

});


app.get('/logout', (req, res) => {
    req.session.token = null
    res.redirect('/api-docs');
    
})

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


