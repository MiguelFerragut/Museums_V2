const axios = require('axios')
const router = require('express').Router()

class MetApiService {

    constructor() {
        this.api = axios.create({
            baseURL: 'https://collectionapi.metmuseum.org/public/collection/v1'
        })
    }


    getAllDepartments() {
        return this.api.get('/departments')
    }

    getFilteredItems(parameter, parameterValue, query) {
        return this.api.get(`/search?${parameter}=${parameterValue}&q=${query}`)
    }

    getDeptsAndHighlights(department, query, isHighLight) {

        const promises = [
            this.getFilteredItems('departmentIds', department, query),
            this.getFilteredItems('isHighlight', isHighLight, query)
        ]

        return Promise.all(promises)
    }

    // getCountryAndIsOnView(isOnView, country) {

    //     return this.getFilteredItems('isOnView', isOnView, country)


    // }

    getAllObjects() {
        return this.api.get('/objects')
    }

    getSinglePiece(id) { //TO DO: REFACTORIZAR EL THEN
        return this.api.get(`/objects/${id}`).then(res => res.data)
    }
}


module.exports = MetApiService