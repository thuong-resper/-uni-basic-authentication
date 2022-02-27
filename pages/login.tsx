import { Box, Stack } from '@mui/material'
import AuthLogin from 'components/auth/auth-forms/AuthLogin'
import { MainLayout } from 'components/layout'
import { NextPageWithLayout } from 'models/common'

const Login: NextPageWithLayout = () => {
	return (
		<Stack
			justifyContent="center"
			alignItems="center"
			sx={{
				py: { xs: 2, sm: 3, md: 12 },
			}}
		>
			<Box
				sx={{
					backgroundColor: 'white',
					p: { xs: 3, xl: 5 },
					borderRadius: 2,
					width: { md: 400, xs: '100%' },
					boxShadow: { md: '0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)', xs: 'none' },
				}}
			>
				<AuthLogin />
			</Box>
		</Stack>
	)
}

Login.Layout = MainLayout

export default Login
