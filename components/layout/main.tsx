import { Stack } from '@mui/material'
import { Box } from '@mui/system'
import { Footer, Header } from 'components/common'
import { LayoutProps } from 'models'
import Head from 'next/head'

export function MainLayout({ children }: LayoutProps) {
	return (
		<Stack sx={{ minHeight: '100vh', background: { md: '#f0f2f5', xs: 'none' } }}>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content="Basic authentication" />
				<meta name="author" content="Thuong Luong" />
				<meta name="author" content="thuongluong" />
				<link rel="avatar" href="/authentication.png" />
				<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@thuongresper" />
				<meta name="twitter:creator" content="@thuongresper" />
				<meta property="og:site_name" content="Basic authentication" />
				<meta property="og:type" content="website" />
				<title>Basic authentication</title>
			</Head>
			{/* <Header /> */}
			<Box component="main" flexGrow={1}>
				{children}
			</Box>
			{/* <Footer /> */}
		</Stack>
	)
}
