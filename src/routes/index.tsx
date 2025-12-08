import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '@/layouts/AppLayout'
import { Dashboard } from '@/pages/dashboard'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard1" replace />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
    ],
  },
])
