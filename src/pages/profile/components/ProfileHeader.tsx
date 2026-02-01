import React from 'react';
import { User } from '@/types';
import { UserAvatar } from './UserAvatar';
import { UserInfo } from './UserInfo';
import { UserMetadata } from './UserMetadata';

interface ProfileHeaderProps {
    user: User;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
    return (
        <div className="relative overflow-hidden glass rounded-[3rem] border-white/50 p-8 sm:p-12 shadow-2xl shadow-orange-500/5">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-red-500/20 rounded-full blur-3xl" />

            <div className="relative flex flex-col md:flex-row items-center md:items-start gap-10">
                <UserAvatar user={user} />

                <div className="flex-1 text-center md:text-left min-w-0">
                    <UserInfo user={user} />
                    <UserMetadata user={user} />
                </div>
            </div>
        </div>
    );
};