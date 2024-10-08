import { storageService } from '../async-storage.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getUsers,
    remove,
    update,
    getLoggedinUser,
    saveLoggedinUser,
}

async function getUsers() {
    const users = await storageService.query('user')
    return users.map(user => {
        delete user.password
        return user
    })
}

async function getById(userId) {
    try {
        const user = await storageService.query('user', userId)
        delete user.password
        return user
    } catch (err) {
        console.log(`Could not get user by id: ${userId}:`, err)
        throw err
    }

}

function remove(userId) {
    return storageService.remove('user', userId)
}

async function update(user) {
    try {
        const userToUpdate = {
            _id: user._id,
            fullname: user.fullname || '',
            imgUrl: user.imgUrl || "https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png",
        }
        await storageService.put('user', userToUpdate)

        // When admin updates other user's details, do not update loggedinUser
        const loggedinUser = getLoggedinUser()
        if (loggedinUser._id === user._id) saveLoggedinUser(user)
        return user
    } catch (err) {
        console.log(`Could not update user by id: ${user._id}:`, err)
        throw err
    }

}
// async function update({ _id }) {
//     const user = await storageService.get('user', _id)
//     await storageService.put('user', user)

//     // When admin updates other user's details, do not update loggedinUser
//     const loggedinUser = getLoggedinUser()
//     if (loggedinUser._id === user._id) saveLoggedinUser(user)
//     return user
// }

async function login(userCred) {
    const users = await storageService.query('user')
    const user = users.find(user => user.username === userCred.username)

    if (user) return saveLoggedinUser(user)
}

async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png'

    const user = await storageService.post('user', userCred)
    return saveLoggedinUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function saveLoggedinUser(user) {
    user = {
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        imgUrl: user.imgUrl,
    }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

// To quickly create an admin user, uncomment the next line
// _createAdmin()

// async function _createAdmin() {
//     const user = {
//         username: 'admin',
//         password: 'admin',
//         fullname: 'Mustafa Adminsky',
//         imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
//         score: 10000,
//     }

//     const newUser = await storageService.post('user', userCred)
//     console.log('newUser: ', newUser)
// }