import { Container, Stack } from '@mui/material'
import { Box } from '@mui/system'
import { ButtonChangeMode } from 'pages/_app'
import * as React from 'react'

export function HeaderDesktop() {
	return (
		<Box display={{ xs: 'none', md: 'block' }} py={2}>
			<Container>
				<Stack direction="row" justifyContent="flex-end" alignItems="center">
					<ButtonChangeMode />
				</Stack>
			</Container>
		</Box>
	)
}
