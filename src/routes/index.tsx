import type { ReactNode } from 'react'
import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layouts/app-layout'
import { useAuth } from '@/hooks/use-auth'

const Dashboard = lazy(() => import('@/pages/dashboard'))
const Agent = lazy(() => import('@/pages/agent/agent'))
const Error = lazy(() => import('@/pages/errors/error'))
const Login1 = lazy(() => import('@/pages/auth/login-1'))
const Login2 = lazy(() => import('@/pages/auth/login-2'))
const Login3 = lazy(() => import('@/pages/auth/login-3'))
const ForgotPassword1 = lazy(() => import('@/pages/auth/forgot-password-1'))
const ForgotPassword2 = lazy(() => import('@/pages/auth/forgot-password-2'))
const ForgotPassword3 = lazy(() => import('@/pages/auth/forgot-password-3'))
const Signup1 = lazy(() => import('@/pages/auth/signup-1'))
const Signup2 = lazy(() => import('@/pages/auth/signup-2'))
const Signup3 = lazy(() => import('@/pages/auth/signup-3'))
const UserSettings = lazy(() => import('@/pages/setting/user-settings'))
const AccountSettings = lazy(() => import('@/pages/setting/account-settings'))
const NotificationSettings = lazy(() => import('@/pages/setting/notification-settings'))
const ConnectionSettings = lazy(() => import('@/pages/setting/connection-settings'))
const BillingSettings = lazy(() => import('@/pages/setting/billing-settings'))

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
        path: 'agent',
        element: (
          <ProtectedRoute>
            <Agent />
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
      {
        path: '401',
        element: <Error statusCode={401} />,
      },
      {
        path: '403',
        element: <Error statusCode={403} />,
      },
      {
        path: '404',
        element: <Error statusCode={404} />,
      },
      {
        path: '500',
        element: <Error statusCode={500} />,
      },
      {
        path: '503',
        element: <Error statusCode={503} />,
      },
      {
        path: 'login',
        element: <Login1 />,
      },
      {
        path: 'login-2',
        element: <Login2 />,
      },
      {
        path: 'login-3',
        element: <Login3 />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword1 />,
      },
      {
        path: 'forgot-password-2',
        element: <ForgotPassword2 />,
      },
      {
        path: 'forgot-password-3',
        element: <ForgotPassword3 />,
      },
      {
        path: 'auth/sign-up',
        element: <Signup1 />,
      },
      {
        path: 'auth/sign-up-2',
        element: <Signup2 />,
      },
      {
        path: 'auth/sign-up-3',
        element: <Signup3 />,
      },
      {
        path: '*',
        element: <Error statusCode={404} />,
      },
    ],
  },
])
