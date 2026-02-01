import React from 'react';
import { User } from '@/types';

interface UserInfoProps {
    user: User;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
    return (
        <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900 truncate">
                {user.fullName || user.username}
            </p>
            <p className="text-xs text-gray-500 truncate mt-0.5">
                {user.email}
            </p>
        </div>
    );
};