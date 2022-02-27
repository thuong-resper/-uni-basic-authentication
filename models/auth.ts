export interface Login {
	username: string
	password: string
}

export interface UserRegister {
	username: string
	password: string
	salt: string
}

export interface User {
	user: any;
	username: string
	salt: string
	passwordHash: string
	role: number
	_id: string
	__V: number
}

export interface LoginResponse {
	accessToken: string
	refreshToken: string
	user: User
}
