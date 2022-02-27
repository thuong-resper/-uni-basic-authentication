import { PaletteMode } from '@mui/material'
import { createTheme, responsiveFontSizes } from '@mui/material/styles'

export const getDesignTokens = (mode: PaletteMode) => ({
	palette: {
		mode,
	},
})

// Create a theme instance.
export let overrideTheme = createTheme({})

overrideTheme = responsiveFontSizes(overrideTheme)
