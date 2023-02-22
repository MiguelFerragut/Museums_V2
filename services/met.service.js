const axios = require('axios')

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
        return this.api.get(`/search?${parameter}=${parameterValue}&q=${query}`).then(res => res.data)
    }
}


module.exports = MetApiService