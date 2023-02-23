const filterByDept = (departments, highlights) => {

    return highlights.objectIDs.filter(elm => {
        if (departments.objectIDs.includes(elm)) {
            return elm
        }
    })
}

module.exports = { filterByDept }