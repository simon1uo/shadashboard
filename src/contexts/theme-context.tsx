import type { MouseEvent } from 'react'
import { createContext } from 'react'

export type Theme = 'light' | 'dark' | 'system'

export interface ThemeContextValue {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
  toggleTheme: (event?: MouseEvent<HTMLElement>) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
