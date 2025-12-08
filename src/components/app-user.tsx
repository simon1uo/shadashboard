import { EllipsisVertical, LogOut, Settings, UserRound } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'

interface AppUserProps {
  user: {
    name: string
    email: string
    avatar?: string
  }
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map(part => part[0] ?? '')
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function AppUser({ user }: AppUserProps) {
  const initials = getInitials(user.name)

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton size="lg" className="gap-3 pr-2">
                <Avatar className="size-8 rounded-md">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-primary/10 text-sm font-semibold uppercase text-primary rounded-md">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-1 flex-col gap-0.5 text-left">
                  <span className="text-sm font-medium leading-tight">{user.name}</span>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
                </div>
                <EllipsisVertical className="size-4 shrink-0 text-muted-foreground" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="right" className="w-44">
              <DropdownMenuItem>
                <UserRound className="mr-2 size-4" />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 size-4" />
                Setting
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 size-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}
