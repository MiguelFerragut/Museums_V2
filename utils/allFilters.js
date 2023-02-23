const filterAll = (departments, onView) => {

    return onView.filter(elm => {
        if (departments.includes(elm)) {
            return elm
        }
    })
}

module.exports = { filterAll }