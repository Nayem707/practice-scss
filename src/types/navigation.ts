import type { LucideIcon } from 'lucide-react';

export interface NavLinkItem {
  label: string;
  to: string;
}

export interface SidebarItem extends NavLinkItem {
  icon: LucideIcon;
}

export interface BreadcrumbItem {
  label: string;
  to: string;
}
