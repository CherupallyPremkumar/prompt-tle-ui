import React from 'react';
import { User } from '@/types';
import { UserAvatar } from './UserAvatar';
import { UserDropdown } from './UserDropdown';

interface UserMenuProps {
    user: User;
    showMenu: boolean;
    setShowMenu: (show: boolean) => void;
    menuRef: React.RefObject<HTMLDivElement>;
    handleLogout: () => void;
    isLoggingOut: boolean;
}

export const UserMenu: React.FC<UserMenuProps> = ({
                                                      user,
                                                      showMenu,
                                                      setShowMenu,
                                                      menuRef,
                                                      handleLogout,
                                                      isLoggingOut,
                                                  }) => {
    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center space-x-2 hover:bg-gray-50 rounded-lg p-2 transition-all"
                aria-expanded={showMenu}
                aria-haspopup="true"
                aria-label="User menu"
            >
                <UserAvatar user={user} size="sm" />

                <span className="hidden sm:block font-medium text-sm text-gray-900 max-w-[120px] truncate">
                    {user.username || user.fullName}
                </span>

                <svg
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                        showMenu ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {showMenu && (
                <UserDropdown
                    user={user}
                    onClose={() => setShowMenu(false)}
                    handleLogout={handleLogout}
                    isLoggingOut={isLoggingOut}
                />
            )}
        </div>
    );
};