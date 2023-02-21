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

    // getOneCharacter(characterId) {
    //     return this.api.get(`/characters/${characterId}`)
    // }

    // saveCharacter(characterData) {
    //     return this.api.post(`/characters`, characterData)
    // }

    // editCharacter(characterId, characterData) {
    //     return this.api.put(`/characters/${characterId}`, characterData)
    // }

    // deleteCharacter(characterId) {
    // }
}

module.exports = MetApiService