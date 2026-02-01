import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { User } from '@/types';

interface UserAvatarProps {
    user: User;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
    const displayName = user.fullName || user.username || 'User';
    const initial = (user.username || 'U')[0].toUpperCase();

    return (
        <div className="relative shrink-0 group">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 to-red-600 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />

            {/* Avatar */}
            {user.pictureUrl ? (
                <img
                    src={user.pictureUrl}
                    alt={displayName}
                    className="w-40 h-40 rounded-full border-[6px] border-white shadow-xl relative object-cover"
                />
            ) : (
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-black text-5xl border-[6px] border-white shadow-xl relative">
                    {initial}
                </div>
            )}

            {/* Badge */}
            <div className="absolute -bottom-2 -right-2 p-3 bg-white rounded-2xl shadow-lg border border-gray-50 text-orange-500">
                <ShieldCheck className="w-6 h-6" />
            </div>
        </div>
    );
};