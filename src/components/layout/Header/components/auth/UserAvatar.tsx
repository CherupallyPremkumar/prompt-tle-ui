import React from 'react';
import { User } from '@/types';
import { useUserAvatar } from "../../hooks/useUserAvatar";


interface UserAvatarProps {
    user: User;
    size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',

    lg: 'w-12 h-12',
};

export const UserAvatar: React.FC<UserAvatarProps> = ({ user, size = 'sm' }) => {
    const { avatarUrl, onImageError } = useUserAvatar(user);

    return (
        <img
            src={avatarUrl}
            alt={user.username || 'User avatar'}
            className={`${sizeClasses[size]} rounded-full border-2 border-orange-500`}
            onError={onImageError}
        />
    );
};