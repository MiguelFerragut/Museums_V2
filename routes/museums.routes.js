const router = require("express").Router()

const Museum = require("../models/Museum.model")
const Department = require('../models/Department.model')

const { isLoggedIn, checkRole, checkUser } = require('../middlewares/route-guard')

const { getUserRoles } = require('./../utils/userRoles')

const metApi = require('../services/met.service')
const { filterByDept } = require("../utils/departmentFiltering")
const api = new metApi()


router.get('/create', isLoggedIn, checkRole('MANAGER', 'ADMIN'), (req, res, next) => {
    res.render('museums/new')
})

router.post('/create', isLoggedIn, checkRole('MANAGER', 'ADMIN'), (req, res, next) => {

    const { name, description, cover, longitude, latitude } = req.body
    const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }

    Museum
        .create({ name, description, cover, location })
        .then(() => res.redirect('/list'))
        .catch(err => next(err))
})


router.get("/list", (req, res, next) => {

    Museum
        .find()
        .select({ name: 1 })
        .sort({ name: 1 })
        .then((museums => res.render('museums/list', {
            museums,
            userRoles: getUserRoles(req.session.currentUser)
        })))
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

    api
        .getDeptsAndHighlights(departments, query)
        .then(([departments, highlights]) => {

            let filtredItems = filterByDept(departments.data, highlights.data)
            const promises = filtredItems.map(id => api.getSinglePiece(id))

            return Promise.all(promises)
        })
        .then((values) => {
            console.log(values)
            res.render('museums/pieces', { values })
        })
})

//RUTA A DETALLES DE LA PIEZA
// router.get("/filter/:piece_id", (req, res, next) => {

//     const { piece_id } = req.params

//     api.getSinglePiece(piece_id)
//         .then(console.log(value))

// })


router.get("/details/:museum_id", (req, res, next) => {

    const { museum_id } = req.params
    const { longitude, latitude } = req.body
    const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }

    Museum
        .findById(museum_id)
        .then(museum => res.render('museums/details', {
            museum,
            userRoles: getUserRoles(req.session.currentUser)
        }))
        .catch(err => next(err))
})


router.get("/edit/:museum_id", isLoggedIn, checkRole('MANAGER', 'ADMIN'), (req, res, next) => {

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

router.post('/edit/:museum_id', isLoggedIn, checkRole('MANAGER', 'ADMIN'), (req, res, next) => {

    const { museum_id } = req.params
    const { name, description, cover, longitude, latitude } = req.body
    const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }

    Museum
        .findByIdAndUpdate(museum_id, { name, description, cover, location })
        .then(() => res.redirect('/list'))
        .catch(err => next(err))
})


router.post('/delete/:museum_id', isLoggedIn, checkRole('MANAGER', 'ADMIN'), (req, res, next) => {

    const { museum_id } = req.params

    Museum
        .findByIdAndDelete(museum_id)
        .then(() => res.redirect('/'))
        .catch(err => next(err))
})


module.exports = router