import type { LucideIcon } from 'lucide-react'
import { AlertTriangle, LayoutDashboard, Settings, Shield, User } from 'lucide-react'

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
        title: 'Settings',
        icon: Settings,
        items: [
          {
            title: 'Account Settings',
            url: '/settings/account',
            icon: User,
            description: 'Manage your account settings and preferences.',
          },
          {
            title: 'Profile Settings',
            url: '/settings/user',
            icon: LayoutDashboard,
            description: 'Update your personal information and preferences',
          },
          {
            title: 'Notifications',
            url: '/settings/notification',
            icon: LayoutDashboard,
            description: 'Configure how you receive notifications.',
          },
          {
            title: 'Connections',
            url: '/settings/connection',
            icon: LayoutDashboard,
            description: 'Connect your account with third-party services and integrations.',
          },
          {
            title: 'Plans & Billing',
            url: '/settings/billing',
            icon: LayoutDashboard,
            description: 'Manage your subscription and billing information.',
          },
        ],
      },
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
      {
        title: 'Errors',
        icon: AlertTriangle,
        items: [
          { title: '401 Unauthorized', url: '/401', icon: LayoutDashboard },
          { title: '403 Forbidden', url: '/403', icon: LayoutDashboard },
          { title: '404 Not Found', url: '/404', icon: LayoutDashboard },
          { title: '500 Server Error', url: '/500', icon: LayoutDashboard },
          { title: '503 Maintenance', url: '/503', icon: LayoutDashboard },
        ],
      },

    ],
  },
]
