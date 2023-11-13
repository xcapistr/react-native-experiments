import { createContext } from 'react'

import { type IColorSchemeContext } from './types'

export const ColorSchemeContext = createContext<IColorSchemeContext | null>(
  null
)
