import React from 'react';

export const LoadingSkeleton: React.FC = () => {
    return (
        <div className="max-w-5xl mx-auto p-4 space-y-8 animate-pulse">
            <div className="h-10 bg-gray-100 rounded-2xl w-3/4" />
            <div className="flex gap-8">
                <div className="w-16 h-48 bg-gray-100 rounded-2xl" />
                <div className="flex-1 space-y-6">
                    <div className="h-4 bg-gray-100 rounded w-full" />
                    <div className="h-4 bg-gray-100 rounded w-5/6" />
                    <div className="h-64 bg-gray-100 rounded-2xl" />
                </div>
            </div>
        </div>
    );
};
