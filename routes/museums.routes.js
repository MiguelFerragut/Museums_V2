const router = require("express").Router()
const Museum = require("../models/Museum.model")
const Department = require('../models/Department.model')

const metApi = require('../services/met.service')
const api = new metApi()




//Create Museum
router.get('/create', (req, res, next) => { res.render('museums/new') })

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


//Museums List
router.get("/list", (req, res, next) => {

    Museum
        .find()
        .sort({ name: 1 })
        .then((museums => res.render('museums/list', { museums })))
        .catch(err => next(err))
})


//Museums Filter
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

    const promises = [api.getFilteredItems('departmentIds', departments, query), api.getFilteredItems('isHighlight', true, 'sun')]

    Promise
        .all(promises)
        .then(([promise1, promise2]) => {
            console.log('EL CONSOLE LOGGGG', promise1)
            let filtredItems = promise2.objectIDs.filter(elm => {
                if (promise1.objectIDs.includes(elm)) {
                    return elm
                }
            })
            console.log({ filtredItems })
        })
    res.render('museums/filter')
})


//Museum Details
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


//Museum Edit
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


//Museum Delete
router.post('/delete/:museum_id', (req, res, next) => {

    const { museum_id } = req.params

    Museum
        .findByIdAndDelete(museum_id)
        .then(() => res.redirect('/'))
        .catch(err => next(err))
})


module.exports = router