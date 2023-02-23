const router = require("express").Router()

const Museum = require("../models/Museum.model")
const Department = require('../models/Department.model')

const { isLoggedIn, checkRole, checkUser } = require('../middlewares/route-guard')

const { getUserRoles } = require('./../utils/userRoles')

const metApi = require('../services/met.service')
const { filterByDept } = require("../utils/departmentFiltering")
const { filterAll } = require('../utils/allFilters')
const { filterUniqueCountries } = require('../utils/filterUniqueCountries')

const Country = require("../models/Country.model")
const { count } = require("../models/Museum.model")
const api = new metApi()


router.get('/filter', (req, res, next) => {

    const promises = [
        Country.find().select({ name: 1 }).sort({ name: 1 }),
        Department.find().select({ name: 1, reference: 1 }).sort({ name: 1 })
    ]

    Promise.all(promises)
        .then(([countries, departments]) => res.render('museums/filter', { departments, countries }))
        .catch(err => next(err))

})

router.post("/filter", (req, res, next) => {

    const { departments, query, isHighLight, isOnView, country } = req.body
    const promises = [
        api.getDeptsAndHighlights(departments, query, isHighLight),
        api.getFilteredItems('isOnView', isOnView, country)
    ]

    return Promise.all(promises)
        .then(([originalItems, secondItems]) => {

            const departmentIDs = originalItems[0].data.objectIDs
            const isHighligthIDs = originalItems[1].data.objectIDs
            const onViewIDs = secondItems.data.objectIDs

            let filtredItems = filterByDept(departmentIDs, isHighligthIDs)
            let resultIDs = filterAll(filtredItems, onViewIDs)

            const promises = resultIDs.map(id => api.getSinglePiece(id))

            return Promise.all(promises)
        })
        .then((values) => {
            const piecesInfo = values.map(({ title, primaryImage, department, artistDisplayName, objectID }) => {
                return ({ title, primaryImage, department, artistDisplayName, objectID })
            }).slice(0, 30)
            res.render('museums/pieces', { values: piecesInfo })
        })
        .catch(err => next(err))
})


router.get("/filter/:piece_id", (req, res, next) => {

    const { piece_id } = req.params
    const promises = [api.getSinglePiece(piece_id)]

    Promise
        .all(promises)
        .then(piece => {
            res.render('museums/piece_details', ...piece)
        })
        .catch(err => next(err))

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