const express = require('express');
const router = express.Router();
const app = express();
const passport = require('passport');
const axios = require('axios');
const session = require('express-session');
const oauthController = require('../controllers/oauth')


app.use(session({
  secret: process.env.GITHUB_CLIENT_SECRET,
  resave:false,
  saveUninitialized:true
}))


;

// Login Routes
router.get('/login', oauthController.login);
//Git callback
router.get('/github/callback', oauthController.login);


// app.get('/login', (req, res) => {
//   res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&prompt=consent`);
// })

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

module.exports = router