const router = require('express').Router()
const passport = require('passport')

// auth with github
router.get('/github', passport.authenticate('github', {
    scope: ['user:email']
}))

router.get('/github/authorize', passport.authenticate('github', {failureRedirect: '/'}), (req, res) => {
    res.send('<h2>Redirect from GitHub Successful!!!</h2>')
})

module.exports = router;