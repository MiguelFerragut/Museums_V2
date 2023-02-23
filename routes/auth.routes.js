const router = require("express").Router()
const bcrypt = require('bcryptjs')

const uploaderMiddleware = require('../middlewares/uploader.middleware')
const { isLoggedOut } = require("../middlewares/route-guard")
const { isLoggedIn } = require("../middlewares/route-guard")

const User = require("../models/User.model")

const saltRounds = 10


router.get('/signup', isLoggedOut, (req, res, next) => res.render('auth/signup'))

router.post('/signup', isLoggedOut, uploaderMiddleware.single('avatar'), (req, res, next) => {

    const { password, username, email } = req.body
    const { path: avatar } = req.file

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(password, salt))
        .then(hashedPassword => User.create({ username, avatar, email, password: hashedPassword }))
        .then(createdUser => res.redirect('/'))
        .catch(error => next(error))
})


router.get('/login', isLoggedOut, (req, res, next) => res.render('auth/login'))

router.post('/login', isLoggedOut, (req, res, next) => {

    const { email, password } = req.body

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.render('auth/login', { errorMessage: 'Email is not in the Data Base.' })
                return
            } else if (bcrypt.compareSync(password, user.password) === false) {
                res.render('auth/login', { errorMessage: 'Wrong password.' })
                return
            } else {
                console.log(req.session)
                req.session.currentUser = user
                res.redirect('/')
            }
        })
        .catch(error => next(error))
})


router.post('/logout', isLoggedIn, (req, res, next) => {
    req.session.destroy(() => res.redirect('/'))
})

module.exports = router