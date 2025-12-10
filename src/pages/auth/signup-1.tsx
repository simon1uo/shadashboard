import { AppLogo } from '@/components/app-logo'
import { SignupForm1 } from './components/signup-form-1'

export default function Signup1() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="/" className="flex items-center gap-3 self-center font-medium">
          <AppLogo nameClassName="text-lg font-semibold" />
        </a>
        <SignupForm1 />
      </div>
    </div>
  )
}
