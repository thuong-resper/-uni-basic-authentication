import { yupResolver } from '@hookform/resolvers/yup'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
	Alert,
	AlertTitle,
	Box,
	Button,
	IconButton,
	InputAdornment,
	TextField,
	Typography
} from '@mui/material'
import { authApi } from 'apis/auth-api'
import { useAuth } from 'hooks'
import { UserRegister } from 'models'
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
	salt: yup.string().required('Salt cá nhân là bắt buộc'),
})

export default function AuthLogin() {
	const router = useRouter()
	const { profile, mutate } = useAuth()
	const [openAlert, setOpenAlert] = useState<boolean>(false)
	const [userRegister, setUserRegister] = useState<any>(null)
	const [message, setMessage] = useState<string>('')

	useEffect(() => {
		if (profile) {
			router.push('/')
		}
	}, [profile])

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
			salt: '',
		},
		mode: 'onBlur',
		resolver: yupResolver(schema),
	})

	const { isSubmitting } = useFormState({ control })

	const onSubmit: SubmitHandler<UserRegister> = async (payload: UserRegister) => {
		try {
			const response: any = await authApi.register(payload)
			if (response) {
				setUserRegister(response.user)
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
					Đăng ký
				</Typography>
			</Box>
			{userRegister && (
				<Alert severity="success">
					<AlertTitle>Đăng ký thành công</AlertTitle>
					Đăng nhập ngay —&nbsp;
					<Link passHref href="/login">
						<strong style={{ cursor: 'pointer' }}>Đăng nhập</strong>
					</Link>
				</Alert>
			)}

			{!userRegister && (
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
						<Typography variant="body1" mt={2}>
							Salt
						</Typography>
						<TextField
							{...register('salt')}
							variant="outlined"
							fullWidth
							id="salt"
							type="text"
							name="salt"
							InputLabelProps={{
								shrink: true,
							}}
							error={!!errors.salt}
							helperText={errors?.salt?.message}
							disabled={isSubmitting}
							autoComplete="salt"
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
								Đăng ký
							</Button>
						</Box>
					</form>
				</Box>
			)}
		</Box>
	)
}
