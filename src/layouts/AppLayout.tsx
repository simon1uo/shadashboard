import { useMemo } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AppHeader } from '@/components/app-header'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { navGroups } from '@/configs/nav-data'

export function AppLayout() {
  const { pathname } = useLocation()

  const currentNav = useMemo(() => {
    const flatNav = navGroups.flatMap(group => group.items)
    return flatNav.find(item => item.href === pathname)
  }, [pathname])

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-1 bg-background text-foreground">
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                {currentNav
                  ? (
                      <div className="px-4 lg:px-6">
                        <div className="flex flex-col">
                          <h1 className="text-2xl font-bold tracking-tight">{currentNav.title}</h1>
                          {Boolean(currentNav.description) && (
                            <p className="text-muted-foreground">{currentNav.description}</p>
                          )}
                        </div>
                      </div>
                    )
                  : null}
                <Outlet />
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
