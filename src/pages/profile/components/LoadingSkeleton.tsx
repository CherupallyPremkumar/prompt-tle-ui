import React from 'react';

export const LoadingSkeleton: React.FC = () => {
    return (
        <div className="max-w-6xl mx-auto p-4 space-y-8 animate-pulse">
            {/* Header skeleton */}
            <div className="h-64 bg-gray-100 rounded-[3rem]" />

            {/* Stats grid skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-32 bg-gray-100 rounded-3xl" />
                ))}
            </div>

            {/* Content tabs skeleton */}
            <div className="bg-gray-100 rounded-[3rem] h-96" />
        </div>
    );
};