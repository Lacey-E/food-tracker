module.exports = {
    ensureAuth: (req, res, next) => {
        if(req.isAuthenticated()) {
            return next()
        }else{
            res.redirect('/')
        }
    },
    ensureGuest: (req, res, next) => {
        if(req.isAuthenticated()) {
            res.send('<h3>User Authenticated</h3>')
        }else{
            return next()
        }
    }
}