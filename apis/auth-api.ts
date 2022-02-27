import Cookies from 'js-cookie'
import { Login, UserRegister } from 'models'
import axiosClient from './axios-client'

export const authApi = {
	register(payload: UserRegister) {
		return axiosClient.post('/api/user/register', payload)
	},

	login(payload: Login) {
		return axiosClient.post('/api/user/login', payload)
	},

	logout() {
		Cookies.remove('access_token')
	},

	getProfile(id: any) {
		return axiosClient.get('/api/user/profile', id)
	},
}
