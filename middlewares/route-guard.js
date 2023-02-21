const isLoggedIn = (req, res, next) => {
    if (req.session.currentUser) {
        next()
    }
    else {
        res.render('auth/login', { errorMessage: 'Log in to continue.' })
    }
}

const isLoggedOut = (req, res, next) => {
    if (!req.session.currentUser) {
        next()
    }
    else {
        res.redirect('/')
    }
}

const checkRole = (...roles) => (req, res, next) => {

    if (roles.includes(req.session.currentUser.role)) {
        next()
    }
    else {
        res.render('auth/login', { errorMessage: `You do not have permissions to continue.` })
    }
}

const checkUser = (req, res, next) => {
    if (req.session.currentUser._id === req.params.user_id || req.session.currentUser.role === 'ADMIN') next()
    else {
        res.render('auth/login', { errorMessage: `You do not have permissions to continue.` })
    }
}


module.exports = { isLoggedIn, isLoggedOut, checkRole, checkUser }