import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { AppLayout } from '@/layouts/AppLayout'

interface ErrorContent {
  code: string
  title: string
  description: string
}

const ERROR_CONTENT: Record<number, ErrorContent> = {
  401: {
    code: '401',
    title: 'Unauthorized',
    description: 'You do not have permission to access this resource. Please sign in or contact your administrator.',
  },
  403: {
    code: '403',
    title: 'Forbidden',
    description: 'Access to this resource is forbidden. You don\'t have the necessary permissions to view this page.',
  },
  404: {
    code: '404',
    title: 'Page Not Found',
    description: 'The page you are looking for doesn\'t exist or has been moved to another location.',
  },
  500: {
    code: '500',
    title: 'Internal Server Error',
    description: 'Something went wrong on our end. We\'re working to fix the issue. Please try again later.',
  },
  503: {
    code: '503',
    title: 'Under Maintenance',
    description: 'The service is currently unavailable. Please try again later.',
  },
}

const DEFAULT_ERROR: ErrorContent = ERROR_CONTENT[500]

export default function Error({ statusCode }: { statusCode: number }) {
  const navigate = useNavigate()

  const content = useMemo(
    () => ERROR_CONTENT[statusCode] ?? DEFAULT_ERROR,
    [statusCode],
  )

  return (
    <AppLayout>
      <div className="flex h-full flex-1">
        <div className="mx-auto flex w-full flex-1 flex-col items-center justify-center gap-8 p-8 md:gap-12 md:p-16">
          <img
            src="https://ui.shadcn.com/placeholder.svg"
            alt="placeholder image"
            className="aspect-video w-240 rounded-xl object-cover dark:brightness-[0.95] dark:invert"
          />
          <div className="text-center">
            <h1 className="mb-4 text-3xl font-bold">{content.code}</h1>
            <h2 className="mb-3 text-2xl font-semibold">{content.title}</h2>
            <p>{content.description}</p>
            <div className="mt-6 flex items-center justify-center gap-4 md:mt-8">
              <Button className="cursor-pointer" onClick={() => navigate('/dashboard')}>Go Back Home</Button>
              <Button variant="outline" className="flex cursor-pointer items-center gap-1" onClick={() => navigate('#')}>
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
