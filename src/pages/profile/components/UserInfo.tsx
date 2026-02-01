import React from 'react';
import { User } from '@/types';
import { Button } from '@/components/common/Button';

interface UserInfoProps {
    user: User;
}

const DEFAULT_BIO = "Crafting unique experiences through prompt engineering and logical design. Passionate about AI-driven creative workflows.";

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
    const displayName = user.fullName || user.username || 'Anonymous Participant';
    const username = user.username || 'anonymous';

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-2">
                        {displayName}
                    </h1>
                    <p className="text-xl font-bold text-orange-600 leading-none">
                        @{username}
                    </p>
                </div>

                <div className="flex gap-3 justify-center">
                    <Button variant="outline" className="rounded-2xl border-gray-200">
                        Message
                    </Button>
                    <Button className="rounded-2xl px-8 shadow-lg shadow-orange-500/20">
                        Follow
                    </Button>
                </div>
            </div>

            <p className="text-lg text-gray-600 mb-8 max-w-2xl font-medium leading-relaxed">
                {user.bio || DEFAULT_BIO}
            </p>
        </>
    );
};