const filterUniqueCountries = (values) => {

    const countries = values.map(elm => elm.country)
    const filteredCountries = countries.filter(elm => elm !== "")
    const allCountries = new Set(filteredCountries)
    const countriesArray = Array.from(allCountries)
    return countriesArray

}

module.exports = { filterUniqueCountries }