import type { LucideIcon } from 'lucide-react'
import { LayoutDashboard, Shield } from 'lucide-react'

export interface NavItem {
  title: string
  url?: string
  icon?: LucideIcon
  description?: string
  items?: NavItem[]
  target?: string
}

export interface NavGroup {
  label?: string
  items: NavItem[]
}

export const navGroups: NavGroup[] = [

  {
    items: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutDashboard,
        description: 'Dashboard description example',
      },
    ],
  },
  {
    label: 'Pages',
    items: [
      {
        title: 'Auth',
        icon: Shield,
        items: [
          { title: 'Login 1', url: '/login', icon: LayoutDashboard, target: '_blank' },
          { title: 'Login 2', url: '/login-2', icon: LayoutDashboard, target: '_blank' },
          { title: 'Login 3', url: '/login-3', icon: LayoutDashboard, target: '_blank' },
          { title: 'Sign up 1', url: '/auth/sign-up', icon: LayoutDashboard, target: '_blank' },
          { title: 'Sign up 2', url: '/auth/sign-up-2', icon: LayoutDashboard, target: '_blank' },
          { title: 'Sign up 3', url: '/auth/sign-up-3', icon: LayoutDashboard, target: '_blank' },
          { title: 'Forgot password 1', url: '/forgot-password', icon: LayoutDashboard, target: '_blank' },
          { title: 'Forgot password 2', url: '/forgot-password-2', icon: LayoutDashboard, target: '_blank' },
          { title: 'Forgot password 3', url: '/forgot-password-3', icon: LayoutDashboard, target: '_blank' },
        ],
      },
    ],
  },
]
