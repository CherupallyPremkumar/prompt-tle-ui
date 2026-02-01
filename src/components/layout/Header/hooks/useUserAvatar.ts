import { useState } from 'react';
import { User } from '@/types';

export const useUserAvatar = (user: User | null) => {
    const [imageError, setImageError] = useState(false);

    const getAvatarUrl = () => {
        if (imageError || !user?.pictureUrl) {
            const name = encodeURIComponent(user?.username || user?.fullName || 'User');
            return `https://ui-avatars.com/api/?name=${name}&background=f97316&color=fff&bold=true`;
        }
        return user.pictureUrl;
    };

    return {
        avatarUrl: getAvatarUrl(),
        onImageError: () => setImageError(true),
    };
};