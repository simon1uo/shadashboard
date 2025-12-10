import type { ReactNode } from 'react'
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

const AUTH_STORAGE_KEY = 'authStatus'

function readInitialAuth() {
  if (typeof window === 'undefined')
    return false
  return window.localStorage.getItem(AUTH_STORAGE_KEY) === 'true'
}

export interface AuthContextValue {
  isAuthed: boolean
  login: (email: string, password: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthed, setIsAuthed] = useState<boolean>(readInitialAuth)

  useEffect(() => {
    if (typeof window === 'undefined')
      return

    const handleStorage = (event: StorageEvent) => {
      if (event.key === AUTH_STORAGE_KEY) {
        setIsAuthed(event.newValue === 'true')
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined')
      return

    if (isAuthed) {
      window.localStorage.setItem(AUTH_STORAGE_KEY, 'true')
    }
    else {
      window.localStorage.removeItem(AUTH_STORAGE_KEY)
    }
  }, [isAuthed])

  const login = useCallback((_email: string, _password: string) => {
    setIsAuthed(true)
  }, [])

  const logout = useCallback(() => {
    setIsAuthed(false)
  }, [])

  const value = useMemo(() => ({ isAuthed, login, logout }), [isAuthed, login, logout])

  return <AuthContext value={value}>{children}</AuthContext>
}
