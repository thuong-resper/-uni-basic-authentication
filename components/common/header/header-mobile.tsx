import Box from '@mui/material/Box'
import { ButtonChangeMode } from 'pages/_app'
import * as React from 'react'

export function HeaderMobile() {
	return (
		<Box display={{ xs: 'block', md: 'none' }} textAlign="right">
			<ButtonChangeMode />
		</Box>
	)
}
