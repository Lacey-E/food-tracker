const express = require('express');
const router = express.Router();
const app = express();
const passport = require('passport');
const axios = require('axios');
const session = require('express-session');

app.use(session({
    secret: process.env.GITHUB_CLIENT_SECRET,
    resave:false,
    saveUninitialized:true
  }))

const login = async (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&prompt=consent`)
  };


  
   


  





  module.exports ={
    login,

  }