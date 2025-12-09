import { Moon, SunMedium } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/use-theme'

export function AppModeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme()

  return (
    <Button variant="outline" size="sm" className="gap-2" onClick={event => toggleTheme(event)}>
      {resolvedTheme === 'dark' ? <Moon className="size-4" /> : <SunMedium className="size-4" />}
    </Button>
  )
}
