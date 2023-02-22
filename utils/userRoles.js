const getUserRoles = user => {

    const userRoles = {

        isUser: user?.role === 'USER',
        isGuide: user?.role === 'GUIDE',
        isManager: user?.role === 'MANAGER',
        isAdmin: user?.role === 'ADMIN'
    }

    return userRoles
}

// const getOwner = user => {

//     const userOwner = {

//         isOwner: user?._id === _id
//     }
// }


module.exports = { getUserRoles }