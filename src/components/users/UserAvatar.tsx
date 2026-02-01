import React from 'react';
import { User } from 'lucide-react';

interface UserAvatarProps {
    src?: string | null;
    alt?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    fallback?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
    src,
    alt = 'User',
    size = 'md',
    className = '',
    fallback
}) => {
    const sizeClasses = {
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-12 h-12 text-base',
        xl: 'w-20 h-20 text-xl'
    };

    const [imgError, setImgError] = React.useState(false);

    const getInitials = (name?: string) => {
        if (!name) return '?';
        return name.slice(0, 2).toUpperCase();
    };

    if (src && !imgError) {
        return (
            <img
                src={src}
                alt={alt}
                className={`rounded-full object-cover ${sizeClasses[size]} ${className}`}
                onError={() => setImgError(true)}
            />
        );
    }

    return (
        <div className={`rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-medium ${sizeClasses[size]} ${className}`}>
            {fallback ? getInitials(fallback) : <User className="w-1/2 h-1/2" />}
        </div>
    );
};
