const getUserRoles = user => {

    const userRoles = {

        isUser: user?.role === 'USER',
        isGuide: user?.role === 'GUIDE',
        isManager: user?.role === 'MANAGER',
        isAdmin: user?.role === 'ADMIN'
    }

    return userRoles
}

const getIsOwner = (user, user_id) => {

    return user?._id === user_id

}


module.exports = { getUserRoles, getIsOwner }

