import type { LucideIcon } from 'lucide-react'
import { LayoutDashboard, PanelsTopLeft } from 'lucide-react'

export interface NavItem {
  title: string
  href: string
  icon: LucideIcon
  description?: string
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

export const navGroups: NavGroup[] = [

  {
    label: 'Dashboards',
    items: [
      {
        title: 'Dashboard 1',
        href: '/dashboard1',
        icon: LayoutDashboard,
        description: 'Dashboard description example',
      },
      {
        title: 'Dashboard 2',
        href: '/dashboard2',
        icon: PanelsTopLeft,
        description: 'Dashboard description example',
      },
    ],
  },
]
