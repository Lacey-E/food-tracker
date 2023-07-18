const GithubStrategy = require('passport-github2')
const GithubUser = require('../models/Github')
const mongoose = require('mongoose')
const passport = require('passport')
require('dotenv').config()

// module.exports = function (passport) {
//     passport.serializeUser((user, done) => {
//         console.log(`From passport.js serializeUser: ${user}`);
//         return done(null, user.id);
//     });

//     passport.deserializeUser((id, done) => {
//         User.findById(id, (err, user) => {
//             done(err, user);
//         });
//     });
// }

const myGitHubStrategy = (passport) => {
    passport.use(new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: '/auth/github/authorize'
    }, async(accessToken, refreshToken, profile, done) => {
        // console.log(profile)
        const newGithubUser = {
            githubId: profile.id,
            username: profile.username,
            displayName: profile.displayName,
            photo: profile.photos[0].value,
            provider: profile.provider,
            profileUrl: profile.profileUrl
        }

        console.log(newGithubUser.displayName)
        let user;
        try {
            user = await GithubUser.findOne({githubId: profile.id})
            if (user) {
                done(null, user)
                console.log(`User exist: ${user}`)
            } else{
                user = await GithubUser.create(newGithubUser)
                done(null, user)
                console.log(`New User: ${user}`)
            }
        }catch(err){
            console.log(err)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id).then((user) => {
            done(null, user)
        })
    })
}

module.exports = myGitHubStrategy