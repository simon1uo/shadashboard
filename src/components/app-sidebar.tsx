import { ChevronRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { navGroups } from '@/configs/nav-data'
import { user } from '@/configs/user'
import { AppLogo } from './app-logo'
import { AppUser } from './app-user'

export function AppSidebar() {
  const { pathname } = useLocation()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-2 py-4">
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link to="/">
              <AppLogo showSubtitle />
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
                {group.items.map((item, itemIndex) => {
                  const Icon = item.icon
                  const hasChildren = Boolean(item.items?.length)
                  const childActive = item.items?.some(child => child.url === pathname)
                  const isActive = pathname === item.url || childActive

                  if (hasChildren) {
                    return (
                      <Collapsible key={item.url || `${item.title}-${itemIndex}`} defaultOpen className="group/collapsible">
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton tooltip={item.title} className="cursor-pointer">
                              {Icon ? <Icon className="size-4" /> : null}
                              <span>{item.title}</span>
                              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.items!.map((child) => {
                                const childActive = pathname === child.url
                                return (
                                  <SidebarMenuSubItem key={child.url || child.title}>
                                    <SidebarMenuSubButton asChild isActive={childActive}>
                                      <Link
                                        to={child.url || '#'}
                                        aria-disabled={!child.url}
                                        target={child.target}
                                        rel={child.target === '_blank' ? 'noreferrer' : undefined}
                                      >
                                        <span>{child.title}</span>
                                      </Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                )
                              })}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    )
                  }

                  return (
                    <SidebarMenuItem key={item.url || item.title}>
                      <SidebarMenuButton
                        asChild={Boolean(item.url)}
                        isActive={Boolean(isActive)}
                        aria-disabled={!item.url}
                      >
                        {item.url
                          ? (
                            <Link to={item.url} target={item.target} rel={item.target === '_blank' ? 'noreferrer' : undefined}>
                              {Icon ? <Icon className="size-4" /> : null}
                              <span>{item.title}</span>
                            </Link>
                          )
                          : (
                            <div className="flex items-center gap-2">
                              {Icon ? <Icon className="size-4" /> : null}
                              <span>{item.title}</span>
                            </div>
                          )}
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
