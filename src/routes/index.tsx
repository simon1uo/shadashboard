import type { ReactNode } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { AppLayout } from '@/layouts/AppLayout'
import {
  ForgotPassword1,
  ForgotPassword2,
  ForgotPassword3,
  Login1,
  Login2,
  Login3,
  Signup1,
  Signup2,
  Signup3,
} from '@/pages/auth'
import { Dashboard } from '@/pages/dashboard'
import { Error } from '@/pages/errors/components/error'
import { AccountSettings, BillingSettings, ConnectionSettings, NotificationSettings, UserSettings } from '@/pages/forms'

function IndexRedirect() {
  const { isAuthed } = useAuth()

  return <Navigate to={isAuthed ? '/dashboard' : '/login'} replace />
}

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthed } = useAuth()

  if (!isAuthed)
    return <Navigate to="/login" replace />

  return <>{children}</>
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <IndexRedirect />,
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'settings/user',
        element: (
          <ProtectedRoute>
            <UserSettings />
          </ProtectedRoute>
        ),
      },
      {
        path: 'settings/account',
        element: (
          <ProtectedRoute>
            <AccountSettings />
          </ProtectedRoute>
        ),
      },
      {
        path: 'settings/notification',
        element: (
          <ProtectedRoute>
            <NotificationSettings />
          </ProtectedRoute>
        ),
      },
      {
        path: 'settings/connection',
        element: (
          <ProtectedRoute>
            <ConnectionSettings />
          </ProtectedRoute>
        ),
      },
      {
        path: 'settings/billing',
        element: (
          <ProtectedRoute>
            <BillingSettings />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <Login1 />,
  },
  {
    path: '/login-2',
    element: <Login2 />,
  },
  {
    path: '/login-3',
    element: <Login3 />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword1 />,
  },
  {
    path: '/forgot-password-2',
    element: <ForgotPassword2 />,
  },
  {
    path: '/forgot-password-3',
    element: <ForgotPassword3 />,
  },
  {
    path: '/auth/sign-up',
    element: <Signup1 />,
  },
  {
    path: '/auth/sign-up-2',
    element: <Signup2 />,
  },
  {
    path: '/auth/sign-up-3',
    element: <Signup3 />,
  },
  {
    path: '/401',
    element: <Error statusCode={401} />,
  },
  {
    path: '/403',
    element: <Error statusCode={403} />,
  },
  {
    path: '/404',
    element: <Error statusCode={404} />,
  },
  {
    path: '/500',
    element: <Error statusCode={500} />,
  },
  {
    path: '/503',
    element: <Error statusCode={503} />,
  },
  {
    path: '*',
    element: <Error statusCode={404} />,
  },
])
