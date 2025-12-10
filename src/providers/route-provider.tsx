import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { LoadingSpinner } from '@/components/loading-spinner'
import { router } from '@/routes'

export function RouteProvider() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RouterProvider router={router} fallbackElement={<LoadingSpinner />} />
    </Suspense>
  )
}
