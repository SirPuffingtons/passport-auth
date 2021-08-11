module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if(req.isAuthenticated) return next()
        
        req.flash('_error', 'Please log in to view this resource.')
        res.redirect('/users/login')
    }
}