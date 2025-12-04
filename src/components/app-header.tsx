import { Moon, SunMedium } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { appMeta } from '@/configs/app-data'
import { useTheme } from '@/hooks/use-theme'

export function AppHeader() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <header className="flex h-14 w-full items-center justify-between border-b px-4">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-6" />
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold">{appMeta.name}</span>
          <span className="text-xs text-muted-foreground">{appMeta.subtitle}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              {resolvedTheme === 'dark' ? <Moon className="size-4" /> : <SunMedium className="size-4" />}

            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-fit-content">
            <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
