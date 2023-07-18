const router = require('express').Router()
const passport = require('passport')

// auth with google 
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}))

// redirect callback route for google
router.get('/google/redirect', passport.authenticate('google', {failureRedirect: '/'}), (req, res) => {
    res.send('<h2>Redirect from Google Successful!!!</h2>')
})

module.exports = router;