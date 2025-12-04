import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '@/layouts/AppLayout'
import Dashboard1Page from '@/pages/dashboard1'
import Dashboard2Page from '@/pages/dashboard2'

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
        path: 'dashboard1',
        element: <Dashboard1Page />,
      },
      {
        path: 'dashboard2',
        element: <Dashboard2Page />,
      },
    ],
  },
])
