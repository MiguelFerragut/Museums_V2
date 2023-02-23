const filterUniqueCountries = (values) => {

    const countries = values.map(elm => elm.name)
    // const filteredCountries = countries.filter(elm => elm !== "")
    const allCountries = new Set(countries)
    const countriesArray = Array.from(allCountries)
    return countriesArray

}

module.exports = { filterUniqueCountries }