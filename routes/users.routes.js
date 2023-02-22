const router = require("express").Router()

const User = require("../models/User.model")

const { isLoggedIn, isLoggedOut, checkRole, checkUser } = require('../middlewares/route-guard')


router.get("/list", (req, res, next) => {

    User
        .find()
        // select
        .sort({ username: 1 })
        .then((users => res.render('users/list', { users })))
        .catch(err => next(err))
})


router.get("/details/:user_id", (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => res.render('users/details', user))
        .catch(err => next(err))
})


router.get("/edit/:user_id", (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => { res.render('users/edit', user) })
        .catch(err => next(err))
})

router.post('/edit/:user_id', (req, res, next) => {

    const { username, email, avatar } = req.body
    const { user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { username, email, avatar })
        .then(() => res.redirect('/'))
        .catch(err => next(err))
})


router.post('/delete/:user_id', (req, res, next) => {

    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect('/list'))
        .catch(err => next(err))
})


module.exports = router