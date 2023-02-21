const router = require("express").Router()
const bcrypt = require('bcryptjs')
const { isLoggedOut } = require("../middlewares/route-guard")
const User = require("../models/User.model")
const saltRounds = 10

router.get('/signup', (req, res, next) => res.render('auth/signup'))

router.post('/signup', (req, res, next) => {

    const { password, username, avatar, email } = req.body

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(password, salt))
        .then(hashedPassword => User.create({ username, avatar, email, password: hashedPassword }))
        .then(createdUser => res.redirect('/'))
        .catch(error => next(error))
})


router.get('/login', (req, res, next) => res.render('auth/login'))

router.post('/login', (req, res, next) => {

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
                req.session.currentUser = user
                res.redirect('/')
            }
        })
        .catch(error => next(error))
})


router.post('/logout', (req, res, next) => {
    req.session.destroy(() => res.redirect('/'))
})

module.exports = router