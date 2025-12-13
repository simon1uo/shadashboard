import type { MouseEvent } from 'react'
import { createContext } from 'react'

export type Theme = 'light' | 'dark' | 'system'

export interface ThemeContextValue {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  brandColorsValues: Record<string, string>
  themeColor: string
  radius: string
  fontSize: string
  setTheme: (theme: Theme) => void
  toggleTheme: (event?: MouseEvent<HTMLElement>) => void
  applyRadius: (radius: string) => void
  applyFontSize: (fontSize: string) => void
  setBrandColorsValues: (value: Record<string, string> | null) => void
  applyThemeColor: (themeValue: string, darkMode: boolean) => void
  setThemeColor: (value: string) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
