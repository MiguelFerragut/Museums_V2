const filterByDept = (departments, highlights) => {

    return highlights.filter(elm => {
        if (departments.includes(elm)) {
            return elm
        }
    })
}

module.exports = { filterByDept }