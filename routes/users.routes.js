const router = require("express").Router()

const User = require("../models/User.model")

const { isLoggedIn, checkRole, checkUser } = require('../middlewares/route-guard')

const { getUserRoles, getIsOwner } = require('./../utils/userRoles')



router.get("/list", isLoggedIn, (req, res, next) => {

    User
        .find()
        .select({ username: 1 })
        .sort({ username: 1 })
        .then((users => res.render('users/list', {
            users,
            userRoles: getUserRoles(req.session.currentUser)
        })))
        .catch(err => next(err))
})


router.get("/details/:user_id", isLoggedIn, (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => res.render('users/details', {
            user,
            userRoles: getUserRoles(req.session.currentUser),
            userOwner: getIsOwner(req.session.currentUser, user_id)
        }))
        .catch(err => next(err))
})


router.get("/edit/:user_id", isLoggedIn, checkUser, (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => {
            res.render('users/edit', {
                user,
                userRoles: getUserRoles(req.session.currentUser),
                userOwner: getIsOwner(req.session.currentUser, user_id)
            })
        })
        .catch(err => next(err))
})

router.post('/edit/:user_id', isLoggedIn, checkUser, (req, res, next) => {

    const { username, email, avatar } = req.body
    const { user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { username, email, avatar })
        .then(() => res.redirect('/users/list'))
        .catch(err => next(err))
})


router.post('/delete/:user_id', isLoggedIn, checkUser, (req, res, next) => {            //si solo meto el role de ADMIN no basta con checkUser

    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect('/users/list'))
        .catch(err => next(err))
})


router.post('/details/:user_id/:role', isLoggedIn, checkRole('MANAGER', 'ADMIN'), (req, res, next) => {

    const { role, user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { role })
        .then(() => res.redirect('/users/list'))
        .catch(err => next(err))
})


module.exports = router