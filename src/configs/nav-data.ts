import type { LucideIcon } from 'lucide-react'
import { LayoutDashboard } from 'lucide-react'

export interface NavItem {
  title: string
  href: string
  icon: LucideIcon
  description?: string
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
        href: '/dashboard',
        icon: LayoutDashboard,
        description: 'Dashboard description example',
      },
    ],
  },
]
