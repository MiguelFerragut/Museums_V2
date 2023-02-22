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

    getDeptsAndHighlights(parameter1, parameter2) {

        const promises = [
            this.getFilteredItems('departmentIds', parameter1, parameter2),
            this.getFilteredItems('isHighlight', true, 'sun')
        ]

        return Promise.all(promises)
    }

    getSinglePiece(id) {
        return this.api.get(`/objects/${id}`).then(res => res.data)
    }
}


module.exports = MetApiService