import { Link, useLocation } from 'react-router-dom'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { appMeta } from '@/configs/app-data'
import { navGroups } from '@/configs/nav-data'
import { user } from '@/configs/user'
import { AppUser } from './app-user'

export function AppSidebar() {
  const { pathname } = useLocation()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-2 py-4">
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link to="/">
              <div className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-sm font-semibold text-primary">
                {appMeta.initials}
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-semibold leading-tight">{appMeta.name}</p>
                <p className="text-xs text-muted-foreground">{appMeta.subtitle}</p>
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>

      <SidebarContent>
        {navGroups.map((group, index) => (
          <SidebarGroup key={group.label || `group-${index}`}>
            {group.label ? <SidebarGroupLabel>{group.label}</SidebarGroupLabel> : null}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link to={item.href}>
                          <Icon className="size-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <AppUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
