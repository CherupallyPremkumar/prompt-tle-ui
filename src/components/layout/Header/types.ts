// Re-export User type from main types
export type { User } from '@/types';

// Navigation item type
export interface NavItem {
    path: string;
    label: string;
}

// Menu item type
export interface MenuItem {
    path: string;
    label: string;
    icon: React.ReactNode;
}

// Avatar size type
export type AvatarSize = 'sm' | 'md' | 'lg';

// Header state type
export interface HeaderState {
    searchQuery: string;
    showUserMenu: boolean;
    showMobileMenu: boolean;
    isLoggingOut: boolean;
}