const router = require("express").Router()
const Event = require("../models/Event.model")
const Museum = require("../models/Museum.model")
const User = require("../models/User.model")
const Department = require('../models/Department.model')
const uploaderMiddleware = require('../middlewares/uploader.middleware')

const { isLoggedIn } = require('../middlewares/route-guard')

// Create Event
router.get('/create', isLoggedIn, (req, res, next) => {

    Department
        .find()
        .select({ name: 1 })
        .sort({ name: 1 })
        .then(departments => res.render('events/new', { departments }))
        .catch(err => next(err))

})

router.post('/create', isLoggedIn, uploaderMiddleware.single('cover'), (req, res, next) => {

    const { title, description, longitude, latitude, day, duration, departments, language } = req.body
    const guideName = req.session.currentUser._id
    const { path: cover } = req.file
    const date = {
        day: day,
        duration: duration
    }
    console.log(departments)

    const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }


    Event
        .create({ title, guideName, description, cover, location, date, departments, language })
        .then(() => res.redirect('/'))
        .catch(err => next(err))
})


//Event List
router.get("/list", (req, res, next) => {

    Event
        .find()
        .sort({ title: 1 })
        .then((events => res.render('events/list', { events })))
        .catch(err => next(err))
})





//Events Filter                                                                    //OJO!  ESTA SIN HACER
router.get("/filter", (req, res, next) => {

    res.render('events/filter')
})





//Events Details
router.get("/details/:event_id", (req, res, next) => {

    const { event_id } = req.params
    const { longitude, latitude } = req.body
    const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }

    Event
        .findById(event_id)
        .populate('departments')
        .then(event => res.render('events/details', event))
        .catch(err => next(err))
})


//Event Edit
router.get("/edit/:event_id", (req, res, next) => {

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

router.post('/edit/:event_id', (req, res, next) => {

    const { event_id } = req.params
    const { title, guideName, description, cover, longitude, latitude, date, participants, departments, language } = req.body
    const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }

    Event
        .findByIdAndUpdate(event_id, { title, guideName, description, cover, longitude, latitude, date, participants, departments, language })
        .then(() => res.redirect('/'))
        .catch(err => next(err))
})


//Event Delete
router.post('/delete/:event_id', (req, res, next) => {

    const { event_id } = req.params

    Event
        .findByIdAndDelete(event_id)
        .then(() => res.redirect('/'))
        .catch(err => next(err))
})


module.exports = router
