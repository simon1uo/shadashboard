import type { Theme } from '@/contexts/theme-context'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { ThemeContext } from '@/contexts/theme-context'

const STORAGE_KEY = 'shadashboard-theme'

function getStoredTheme(): Theme {
  if (typeof window === 'undefined')
    return 'system'
  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null
  return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system'
}

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined')
    return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => getStoredTheme())
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() => getSystemTheme())

  // 订阅系统主题变化
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const listener = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? 'dark' : 'light')
    }
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [])

  const resolvedTheme = useMemo(
    () => (theme === 'system' ? systemTheme : theme),
    [theme, systemTheme],
  )

  // 将 theme 写入存储
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, theme)
    }
  }, [theme])

  // 应用到文档元素
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', resolvedTheme === 'dark')
  }, [resolvedTheme])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme,
    }),
    [theme, resolvedTheme, setTheme, toggleTheme],
  )

  return <ThemeContext value={value}>{children}</ThemeContext>
}
