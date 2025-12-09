import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { appMeta } from '@/configs/app-data'
import { AppModeToggle } from './app-mode-toggle'

export function AppHeader() {
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
        <AppModeToggle />
      </div>
    </header>
  )
}
