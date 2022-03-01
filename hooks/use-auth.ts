import { authApi } from 'apis/auth-api'
import { User } from 'models'
import useSWR from 'swr'

export function useAuth() {
	const { data: profile, error, mutate } = useSWR<User>('/api/user/profile')
	const firstLoading = profile === undefined && error === undefined

	async function logout() {
		await authApi.logout()
		mutate(undefined, false)
	}

	return {
		profile,
		error,
		logout,
		mutate,
		firstLoading,
	}
}
