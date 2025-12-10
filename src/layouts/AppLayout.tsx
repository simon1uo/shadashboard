import type { ReactNode } from 'react'
import { useEffect, useMemo } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AppHeader } from '@/components/app-header'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { navGroups } from '@/configs/nav-data'

function findNavItemByUrl(url: string) {
  const queue: (typeof navGroups[number]['items']) = []

  for (const group of navGroups) {
    queue.push(...group.items)
  }

  while (queue.length) {
    const item = queue.shift()
    if (!item) break

    if (item.url === url) return item
    if (item.items?.length) queue.push(...item.items)
  }

  return undefined
}

export function AppLayout({ children }: { children?: ReactNode }) {
  const { pathname } = useLocation()

  const currentNav = useMemo(() => {
    return findNavItemByUrl(pathname)
  }, [pathname])

  useEffect(() => {
    window.scrollTo(0, 0)
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
                {children ?? <Outlet />}
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
