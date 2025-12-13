import type { MouseEvent } from 'react'

import type { Theme } from '@/contexts/theme-context'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { DEFAULT_FONT_SIZE, DEFAULT_RADIUS, themeBaseColors, themeColorOptions, themeVarKeys } from '@/configs/theme-data'
import { ThemeContext } from '@/contexts/theme-context'

const STORAGE_KEY = 'shadashboard-theme'
const DEFAULT_PREFERENCES = {
  theme: 'system' as Theme,
  themeColor: 'default',
  radius: DEFAULT_RADIUS,
  fontSize: DEFAULT_FONT_SIZE,
}

function setCssVar(name: string, value: string) {
  if (typeof document === 'undefined')
    return
  document.documentElement.style.setProperty(name, value)
}

function ensureCssVar(name: string, value: string) {
  if (typeof document === 'undefined')
    return
  const rootStyle = document.documentElement.style
  if (!rootStyle.getPropertyValue(name).trim())
    rootStyle.setProperty(name, value)
}

interface StoredPreferences {
  theme: Theme
  themeColor: string
  radius: string
  fontSize: string
}

function normalizeTheme(value: unknown): Theme {
  return value === 'light' || value === 'dark' || value === 'system' ? value : DEFAULT_PREFERENCES.theme
}

function getStoredPreferences(): StoredPreferences {
  if (typeof window === 'undefined')
    return DEFAULT_PREFERENCES

  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw)
    return DEFAULT_PREFERENCES

  try {
    const parsed = JSON.parse(raw)
    if (typeof parsed === 'string') {
      return {
        ...DEFAULT_PREFERENCES,
        theme: normalizeTheme(parsed),
      }
    }

    if (typeof parsed === 'object' && parsed) {
      const record = parsed as Record<string, unknown>
      return {
        theme: normalizeTheme(record.theme),
        themeColor: typeof record.themeColor === 'string' ? record.themeColor : DEFAULT_PREFERENCES.themeColor,
        radius: typeof record.radius === 'string' ? record.radius : DEFAULT_PREFERENCES.radius,
        fontSize: typeof record.fontSize === 'string' ? record.fontSize : DEFAULT_PREFERENCES.fontSize,
      }
    }
  }
  catch {
    // ignore parsing errors and fall back to defaults
  }

  return DEFAULT_PREFERENCES
}

function setStoredPreferences(value: StoredPreferences) {
  if (typeof window === 'undefined')
    return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
}

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined')
    return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function isAppearanceTransitionSupported() {
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function resetThemeColor() {
  // remove css vars
  const root = document.documentElement
  themeVarKeys.forEach((key) => {
    root.style.removeProperty(`--${key}`)
  })

  // remove inline styles
  const inlineStyles = root.style
  for (let i = inlineStyles.length - 1; i >= 0; i--) {
    const property = inlineStyles[i]
    if (property.startsWith('--')) {
      root.style.removeProperty(property)
    }
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const initialPreferences = useMemo(() => getStoredPreferences(), [])
  const [theme, setThemeState] = useState<Theme>(() => initialPreferences.theme)
  const [themeColor, setThemeColorState] = useState<string>(() => initialPreferences.themeColor)
  const [radius, setRadiusState] = useState<string>(() => initialPreferences.radius)
  const [fontSize, setFontSizeState] = useState<string>(() => initialPreferences.fontSize)
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() => getSystemTheme())
  const [brandColorsValues, setBrandColorsValues] = useState<Record<string, string>>({})

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

  useEffect(() => {
    setStoredPreferences({ theme, themeColor, radius, fontSize })
  }, [theme, themeColor, radius, fontSize])

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', resolvedTheme === 'dark')
  }, [resolvedTheme])

  useEffect(() => {
    ensureCssVar('--radius', DEFAULT_RADIUS)
    ensureCssVar('--font-size-base', DEFAULT_FONT_SIZE)
  }, [])

  useEffect(() => {
    setCssVar('--radius', radius)
  }, [radius])

  useEffect(() => {
    setCssVar('--font-size-base', fontSize)
  }, [fontSize])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
  }, [])

  const applyRadius = useCallback((radius: string) => {
    setRadiusState(radius)
    setCssVar('--radius', radius)
  }, [])

  const applyFontSize = useCallback((fontSize: string) => {
    setFontSizeState(fontSize)
    setCssVar('--font-size-base', fontSize)
  }, [])

  const handleSetBrandColorsValues = useCallback((value: Record<string, string> | null) => {
    setBrandColorsValues(value ?? {})
  }, [])

  const updateBrandColorsFromTheme = useCallback((styles: Record<string, string>) => {
    const newValues: Record<string, string> = {}
    themeBaseColors.forEach((color) => {
      const cssVar = color.cssVar.replace('--', '')
      if (styles[cssVar]) {
        newValues[color.cssVar] = styles[cssVar]
      }
    })
    setBrandColorsValues(newValues)
  }, [])

  const applyThemeColor = useCallback((themeValue: string, darkMode: boolean) => {
    const theme = themeColorOptions.find(t => t.value === themeValue)
    if (!theme)
      return

    // Reset and apply theme variables
    setThemeColorState(themeValue)
    resetThemeColor()
    const styles = darkMode ? theme.preset.styles.dark : theme.preset.styles.light
    const root = document.documentElement

    Object.entries(styles).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value)
    })

    // Update brand colors values when theme changes
    updateBrandColorsFromTheme(styles)
    // Reapply user overrides for radius and font size after preset variables
    setCssVar('--radius', radius)
    setCssVar('--font-size-base', fontSize)
  }, [resetThemeColor, updateBrandColorsFromTheme, radius, fontSize])

  useEffect(() => {
    applyThemeColor(themeColor, resolvedTheme === 'dark')
  }, [applyThemeColor, themeColor, resolvedTheme])

  const toggleTheme = useCallback((event?: MouseEvent<HTMLElement>) => {
    const nextTheme: Theme = resolvedTheme === 'dark' ? 'light' : 'dark'
    const nextIsDark = nextTheme === 'dark'
    const startViewTransition = (document).startViewTransition?.bind(document) as
      | ((callback: () => void | Promise<void>) => ViewTransition)
      | undefined

    const applyThemeColorForNext = () => {
      handleSetBrandColorsValues(null)
      applyThemeColor(themeColor, nextIsDark)
    }

    if (!event || !startViewTransition || !isAppearanceTransitionSupported()) {
      setThemeState(nextTheme)
      applyThemeColorForNext()
      return
    }

    const x = event.clientX
    const y = event.clientY
    const isDarkMode = resolvedTheme === 'dark'
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )

    const transition = startViewTransition(() => {
      setThemeState(nextTheme)
      applyThemeColorForNext()
    })

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]
      document.documentElement.animate(
        {
          clipPath: isDarkMode ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 400,
          easing: 'ease-out',
          fill: 'forwards',
          pseudoElement: isDarkMode
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        },
      )
    })
  }, [resolvedTheme, themeColor, applyThemeColor, handleSetBrandColorsValues])

  const value = useMemo(
    () => ({
      theme,
      radius,
      fontSize,
      resolvedTheme,
      themeColor,
      brandColorsValues,
      setTheme,
      toggleTheme,
      setBrandColorsValues: handleSetBrandColorsValues,
      applyRadius,
      applyFontSize,
      applyThemeColor,
      setThemeColor: setThemeColorState,
    }),
    [theme, radius, fontSize, resolvedTheme, themeColor, brandColorsValues, setTheme, toggleTheme, handleSetBrandColorsValues, applyRadius, applyFontSize, applyThemeColor],
  )

  return <ThemeContext value={value}>{children}</ThemeContext>
}
