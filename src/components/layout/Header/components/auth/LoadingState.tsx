import React from 'react';


export const LoadingState: React.FC = () => {
    return (
        <div className="flex items-center space-x-2 p-2">
            {/* Avatar Skeleton */}
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />

            {/* Name Skeleton */}
            <div className="hidden sm:block w-24 h-4 rounded bg-gray-200 animate-pulse" />
        </div>
    );
};