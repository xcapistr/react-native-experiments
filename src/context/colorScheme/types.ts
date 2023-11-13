import { type ColorSchemeName } from 'react-native'

export type ContextValue<T extends keyof IColorSchemeContext> =
  IColorSchemeContext[T]

export interface IColorSchemeContext {
  theme: ColorSchemeName
  toggleTheme: ({ x, y }: { x: number; y: number }) => void
  isDark: boolean
}
