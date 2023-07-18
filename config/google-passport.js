const GoogleStrategy = require('passport-google-oauth20')
const GithubStrategy = require('passport-github2')
const mongoose = require('mongoose')
const GoogleUser = require('../models/Google')
const passport = require('passport')
require('dotenv').config()

const myGoogleStrategy = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/redirect'
    }, async (accessToken, refreshToken, profile, done) => {
        // console.log(profile)
        const newGoogleUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value
        }
        // console.log(newGoogleUser.displayName)

        try{

            let user = await GoogleUser.findOne({googleId: profile.id})
            if(user) {
                done(null, user)
                console.log(`User exist: ${user}`)
            }else{
                user = await GoogleUser.create(newGoogleUser)
                done(null, user)
                console.log(`New User: ${user}`)
            }

        } catch(err) {
            console.log(err)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    // passport.deserializeUser((id, done) => {
    //     User.findById(id, (err, user) => {
    //         done(err, user);
    //     });
    // });

    passport.deserializeUser((id, done) => {
        GoogleUser.findById(id).then((user) => {
            done(null, user)
        })
    })
}

module.exports = myGoogleStrategy