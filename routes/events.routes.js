const router = require("express").Router()

const Event = require("../models/Event.model")
const Museum = require("../models/Museum.model")
const User = require("../models/User.model")
const Department = require('../models/Department.model')

const uploaderMiddleware = require('../middlewares/uploader.middleware')
const { isLoggedIn, checkRole } = require('../middlewares/route-guard')


router.get('/create', isLoggedIn, (req, res, next) => {

    Department
        .find()
        .select({ name: 1 })
        .sort({ name: 1 })
        .then(departments => res.render('events/new', { departments }))
        .catch(err => next(err))

})

router.post('/create', isLoggedIn, checkRole('GUIDE', 'ADMIN'), uploaderMiddleware.single('cover'), (req, res, next) => {

    const { title, description, longitude, latitude, day, duration, departments, language } = req.body
    const { _id: guideName } = req.session.currentUser
    const { path: cover } = req.file
    const date = {
        day: day,
        duration: duration
    }
    const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }

    Event
        .create({ title, guideName, description, cover, location, date, departments, language })
        .then(() => res.redirect('/events/list'))
        .catch(err => next(err))
})


router.get("/list", (req, res, next) => {

    Event
        .find()
        .select({ title: 1, departments: 1 })
        .populate('departments')
        .sort({ title: 1 })
        .then((events => res.render('events/list', { events })))
        .catch(err => next(err))
})


//Events Filter                                                                    //OJO!  ESTA SIN HACER
router.get("/filter", (req, res, next) => {

    res.render('events/filter')
})


router.get("/details/:event_id", (req, res, next) => {

    const { event_id } = req.params
    const { longitude, latitude } = req.body
    const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }

    Event
        .findById(event_id)
        .populate('guideName')
        .populate('departments')
        .then(event => res.render('events/details', event))
        .catch(err => next(err))
})


router.get("/edit/:event_id", isLoggedIn, checkRole('GUIDE', 'ADMIN'), (req, res, next) => {

    const { event_id } = req.params
    const { longitude, latitude } = req.body
    const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }

    Event
        .findById(event_id)
        .then(event => { res.render('events/edit', event) })
        .catch(err => next(err))
})

router.post('/edit/:event_id', isLoggedIn, checkRole('GUIDE', 'ADMIN'), (req, res, next) => {

    const { event_id } = req.params
    const { title, guideName, description, cover, longitude, latitude, date, participants, departments, language } = req.body
    const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }

    Event
        .findByIdAndUpdate(event_id, { title, guideName, description, cover, longitude, latitude, date, participants, departments, language })
        .then(() => res.redirect('/events/list'))
        .catch(err => next(err))
})


router.post('/delete/:event_id', isLoggedIn, checkRole('GUIDE', 'ADMIN'), (req, res, next) => {

    const { event_id } = req.params

    Event
        .findByIdAndDelete(event_id)
        .then(() => res.redirect('/events/list'))
        .catch(err => next(err))
})


module.exports = router
