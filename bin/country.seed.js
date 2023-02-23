const { default: mongoose } = require('mongoose')

const Country = require('../models/Country.model')
const metApi = require('../services/met.service')
const api = new metApi()
require('../db')

const { filterUniqueCountries } = require('../utils/filterUniqueCountries')

let allCountries = []

Country
    .find()
    .then(countries => {
        const uniqueCountries = filterUniqueCountries(countries).filter(element => {
            return !element.toLowerCase().startsWith("probably")
                &&
                !element.toLowerCase().startsWith("possibly")
        })

        allCountries = uniqueCountries.map(country => ({ name: country }))
        return Country.deleteMany()
    })
    .then(() => {
        return Country.insertMany(allCountries)
    })
    .catch(e => console.log(e))
    .finally(() => mongoose.connection.close())


// let countries
// let origin = 0
// let counter = 80

// setInterval(() => {

//     api
//         .getAllObjects()
//         .then(({ data: { objectIDs } }) => {

//             const promises = objectIDs.slice(origin, counter).map(id => api.getSinglePiece(id))
//             return Promise.all(promises)
//         })
//         .then((values) => {
//             countries = filterUniqueCountries(values).map(country => ({ name: country }))
//             return Country.insertMany(countries)
//         })
//         .then((countries) => {
//             origin += 80
//             counter += 80
//             console.log('aqui estan los paises', countries)
//         })
//         .catch(err => console.log(err))
//     // .finally(() => mongoose.connection.close())
// }, 1500);