import { Bell, CreditCard, EllipsisVertical, LogOut, Plug, UserRound } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { useAuth } from '@/hooks/use-auth'

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
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

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
              <DropdownMenuItem asChild>
                <Link to="/settings/account">
                  <UserRound className="mr-2 size-4" />
                  Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings/billing">
                  <CreditCard className="mr-2 size-4" />
                  Billing
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings/notification">
                  <Bell className="mr-2 size-4" />
                  Notifications
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings/connection">
                  <Plug className="mr-2 size-4" />
                  Connections
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={handleLogout}>
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
