import { Alert, Box, Button, Stack } from '@mui/material'
import { Auth } from 'components/common'
import { MainLayout } from 'components/layout'
import { useAuth } from 'hooks'
import { NextPageWithLayout } from 'models/common'
import React from 'react'

const Home: NextPageWithLayout = () => {
	const { profile, logout } = useAuth()

	async function logoutHandler() {
		try {
			await logout()
		} catch (error) {
			console.log('failed to logout', error)
		}
	}
	return (
		<Auth>
			<Stack
				justifyContent="center"
				alignItems="center"
				sx={{
					py: { xs: 2, sm: 3, md: 12 },
				}}
			>
				{profile && (
					<Box
						sx={{
							backgroundColor: 'white',
							p: { xs: 3, xl: 5 },
							borderRadius: 2,
							width: { md: 400, xs: '100%' },
							boxShadow: {
								md: '0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)',
								xs: 'none',
							},
						}}
					>
						<Alert severity="info">
							Đã đăng nhập với người dùng: <b>{profile?.user.username}</b>
						</Alert>
						<Button
							disableElevation
							fullWidth
							size="large"
							variant="contained"
							color="primary"
							sx={{
								fontWeight: 900,
								textTransform: 'none',
								my: 2,
							}}
							onClick={logoutHandler}
						>
							Đăng xuất
						</Button>
					</Box>
				)}
			</Stack>
		</Auth>
	)
}

Home.Layout = MainLayout

export default Home
