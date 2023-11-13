import { useContext } from 'react'

import { ColorSchemeContext } from './ColorSchemeContext'

export const useColorScheme = () => {
  const colorSchemeContextValue = useContext(ColorSchemeContext)

  if (!colorSchemeContextValue)
    throw new Error(
      'useColorScheme must be used within ColorSchemeProvider scope'
    )

  return colorSchemeContextValue
}
