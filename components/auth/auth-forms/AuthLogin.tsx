import { yupResolver } from '@hookform/resolvers/yup'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
	Alert,
	Box,
	Button,
	IconButton,
	InputAdornment,
	TextField,
	Typography
} from '@mui/material'
import { authApi } from 'apis/auth-api'
import { useAuth } from 'hooks'
import Cookies from 'js-cookie'
import { Login } from 'models'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm, useFormState } from 'react-hook-form'
import * as yup from 'yup'

export interface LoginPageProps {}

//yup validation
const schema = yup.object().shape({
	username: yup.string().required('Tên người dùng là bắt buộc'),
	password: yup.string().required('Mật khẩu là bắt buộc'),
})

export default function AuthLogin() {
	const router = useRouter()
	const { profile, mutate } = useAuth()
	const [openAlert, setOpenAlert] = useState<boolean>(false)
	const [message, setMessage] = useState<string>('')

	useEffect(() => {
		if (profile) {
			router.push('/')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [profile])
	console.log(profile)

	// form
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: {
			username: '',
			password: '',
		},
		mode: 'onBlur',
		resolver: yupResolver(schema),
	})

	const { isSubmitting } = useFormState({ control })

	const onSubmit: SubmitHandler<Login> = async (payload: Login) => {
		try {
			const response = await authApi.login(payload)
			if (response) {
				const setCookie = (response: any) => {
					const { accessToken } = response
					Cookies.set('access_token', accessToken, { expires: 1 }) //1 day
				}
				setCookie(response)
				router.push('/')
				setOpenAlert(false)
				setMessage('')
			}
		} catch (error: any) {
			setOpenAlert(true)
			setMessage(error.response.data.message)
		}
		mutate()
	}

	const [showPassword, setShowPassword] = useState<boolean>(false)
	const handleClickShowPassword = () => {
		setShowPassword((prev) => !prev)
	}

	const handleMouseDownPassword = (event: any) => {
		event.preventDefault()
	}

	return (
		<Box>
			<Box mb={4}>
				<Typography variant="h4" fontWeight={900}>
					Đăng nhập
				</Typography>
			</Box>
			{profile && !openAlert ? (
				<Alert severity="info">
					Logged in with: <b>{profile?.user.username}</b>
				</Alert>
			) : null}
			<Box>
				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					<Typography variant="body1">Tên người dùng</Typography>
					<TextField
						{...register('username')}
						variant="outlined"
						fullWidth
						id="username"
						type="text"
						name="username"
						InputLabelProps={{
							shrink: true,
						}}
						error={!!errors.username}
						helperText={errors?.username?.message}
						disabled={isSubmitting}
						autoComplete="username"
					/>
					<Typography variant="body1" mt={2}>
						Mật khẩu
					</Typography>
					<TextField
						{...register('password')}
						type={showPassword ? 'text' : 'password'}
						id="password"
						variant="outlined"
						fullWidth
						name="password"
						InputLabelProps={{
							shrink: true,
						}}
						autoComplete="current-password"
						disabled={isSubmitting}
						error={!!errors.password}
						helperText={errors?.password?.message}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										color="inherit"
									>
										{showPassword ? (
											<Visibility fontSize="small" />
										) : (
											<VisibilityOff fontSize="small" />
										)}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
					<Box mt={2}>{openAlert && <Alert severity="error">{message}</Alert>}</Box>
					<Box sx={{ mt: 3 }}>
						<Button
							disableElevation
							disabled={isSubmitting}
							fullWidth
							size="large"
							type="submit"
							variant="contained"
							color="primary"
							sx={{
								lineHeight: '40px',
								fontWeight: 900,
								fontSize: { md: 20, xs: 18 },
								textTransform: 'none',
							}}
						>
							Đăng nhập
						</Button>
					</Box>
				</form>
			</Box>
			<Box my={2}>
				<Link passHref href="/register">
					<Typography variant="body1" textAlign="center" sx={{ cursor: 'pointer' }}>
						Chưa có tài khoản? Đăng ký
					</Typography>
				</Link>
			</Box>
		</Box>
	)
}
