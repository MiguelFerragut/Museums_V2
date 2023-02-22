const router = require("express").Router()

const Museum = require("../models/Museum.model")
const Department = require('../models/Department.model')

const metApi = require('../services/met.service')
const api = new metApi()


router.get('/create', (req, res, next) => {
    res.render('museums/new')
})

router.post('/create', (req, res, next) => {

    const { name, description, cover, longitude, latitude } = req.body
    const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }

    Museum
        .create({ name, description, cover, location })
        .then(() => res.redirect('/'))
        .catch(err => next(err))
})


router.get("/list", (req, res, next) => {

    Museum
        .find()
        .select({ name: 1 })
        .sort({ name: 1 })
        .then((museums => res.render('museums/list', { museums })))
        .catch(err => next(err))
})


router.get('/filter', (req, res, next) => {

    Department
        .find()
        .select({ name: 1, reference: 1 })
        .sort({ name: 1 })
        .then(departments => res.render('museums/filter', { departments }))
        .catch(err => next(err))

})

router.post("/filter", (req, res, next) => {

    const { departments, query } = req.body

    const promises = [
        api.getFilteredItems('departmentIds', departments, query),
        api.getFilteredItems('isHighlight', true, 'sun')
    ]

    Promise
        .all(promises)
        .then(([departments, highlights]) => {
            let filtredItems = highlights.objectIDs.filter(elm => {
                if (departments.objectIDs.includes(elm)) {
                    return elm
                }
            })
            console.log({ filtredItems })
        })
    res.render('museums/filter')
})


router.get("/details/:museum_id", (req, res, next) => {

    const { museum_id } = req.params
    const { longitude, latitude } = req.body
    const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }

    Museum
        .findById(museum_id)
        .then(museum => res.render('museums/details', museum))
        .catch(err => next(err))
})


router.get("/edit/:museum_id", (req, res, next) => {

    const { museum_id } = req.params
    const { longitude, latitude } = req.body
    const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }

    Museum
        .findById(museum_id)
        .then(museum => { res.render('museums/edit', museum) })
        .catch(err => next(err))
})

router.post('/edit/:museum_id', (req, res, next) => {

    const { museum_id } = req.params
    const { name, description, cover, longitude, latitude } = req.body
    const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }

    Museum
        .findByIdAndUpdate(museum_id, { name, description, cover, location })
        .then(() => res.redirect('/'))
        .catch(err => next(err))
})


router.post('/delete/:museum_id', (req, res, next) => {

    const { museum_id } = req.params

    Museum
        .findByIdAndDelete(museum_id)
        .then(() => res.redirect('/'))
        .catch(err => next(err))
})


module.exports = router