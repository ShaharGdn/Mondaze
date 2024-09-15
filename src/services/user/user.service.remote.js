import { httpService } from '../http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
	login,
	logout,
	signup,
	getUsers,
	getById,
	remove,
	update,
	getLoggedinUser,
	saveLoggedinUser,
}

function getUsers() {
	return httpService.get(`user/`)
}

async function getById(userId) {
	return await httpService.get(`user/${userId}`)
}

function remove(userId) {
	return httpService.delete(`user/${userId}`)
}

async function update(user) {
	return await httpService.put(`user/${user._id}`, user)
}

async function login(userCred) {
	try {
		const user = await httpService.post('auth/login', userCred)
		if (user) {
			saveLoggedinUser(user)
			return user
		}
	} catch (err) {
		console.log('Login failed:', err);
		throw err;
	}
}

async function signup(userCred) {
	try {
		const user = await httpService.post('auth/signup', userCred)
		if (user) {
			saveLoggedinUser(user)
			return user
		}
	} catch (err) {
		console.log('Sign up failed:', err);
		throw err;
	}
}

async function logout() {
	sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
	return await httpService.post('auth/logout')
}

function getLoggedinUser() {
	// for auto Guest user if no loggedInUser:
	const guest = {
		_id: '',
		fullname: 'Guest',
		imgUrl: 'https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png',
		updates: []
	}
	const loggedInUser = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
	return loggedInUser ? loggedInUser : guest
	// return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function saveLoggedinUser(user) {
	const userToSave = {
		_id: user._id,
		fullname: user.fullname,
		imgUrl: user.imgUrl,
		updates: user.updates || []
	}
	sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSave))
	return userToSave
}
