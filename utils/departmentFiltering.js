const filterByDept = (departments, highlights) => {

    // console.log('DPTS-----', departments)
    // console.log('high-----', highlights)

    return highlights.objectIDs.filter(elm => {
        if (departments.objectIDs.includes(elm)) {
            return elm
        }
    })
}

module.exports = { filterByDept }