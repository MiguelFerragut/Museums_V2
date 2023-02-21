const router = require("express").Router()
const Museum = require("../models/Museum.model")


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


//Museums Filter                                                                    //OJO! SIN HACER
router.get("/filter", (req, res, next) => {

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