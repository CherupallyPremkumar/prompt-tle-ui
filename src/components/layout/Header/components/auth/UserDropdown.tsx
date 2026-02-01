import React from 'react';
import { User } from '@/types';
import { UserInfo } from './UserInfo';
import { DropdownMenuItem } from './DropdownMenuItem';
import { LogoutButton } from './LogoutButton';
import { DROPDOWN_MENU_ITEMS } from "../../constants";

interface UserDropdownProps {
    user: User;
    onClose: () => void;
    handleLogout: () => void;
    isLoggingOut: boolean;
}

export const UserDropdown: React.FC<UserDropdownProps> = ({
    user,
    onClose,
    handleLogout,
    isLoggingOut,
}) => {
    return (
        <div
            className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200"
            role="menu"
            aria-orientation="vertical"
        >
            <UserInfo user={user} />

            {DROPDOWN_MENU_ITEMS.map((item) => (
                <DropdownMenuItem
                    key={item.path}
                    {...item}
                    userId={user.id}
                    onClick={onClose}
                />
            ))}

            <hr className="my-2 border-gray-100" />

            <LogoutButton
                onClick={handleLogout}
                isLoading={isLoggingOut}
            />
        </div>
    );
};