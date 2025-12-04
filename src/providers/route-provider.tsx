import { RouterProvider } from 'react-router-dom'
import { router } from '@/routes'

export function RouteProvider() {
  return <RouterProvider router={router} />
}
