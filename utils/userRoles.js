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

//         isOwner: user?._id === `${user_id}`,
//         isOwner: req.session.currentUser._id === req.body.user_id,
//         isOwner: req.session.currentUser._id === req.params.user_id
//     }

//     return userOwner
// }


module.exports = { getUserRoles }

