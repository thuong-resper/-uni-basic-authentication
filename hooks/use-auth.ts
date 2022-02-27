import { User } from 'models'
import useSWR from 'swr'

export function useAuth() {
	const { data: profile, error, mutate } = useSWR<User>('/api/user/profile')
	const firstLoading = profile === undefined && error === undefined

	const logout = error && error.status === 400

	return {
		profile,
		error,
		logout,
		mutate,
		firstLoading,
	}
}
