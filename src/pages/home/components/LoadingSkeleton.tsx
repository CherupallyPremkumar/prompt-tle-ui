import React from 'react';

export const LoadingSkeleton: React.FC = () => {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Hero Skeleton */}
            <div className="bg-gray-200 rounded-2xl h-64 w-full" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Filter Tabs Skeleton */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-4">
                        <div className="flex gap-4">
                            <div className="h-10 bg-gray-200 rounded-xl w-24" />
                            <div className="h-10 bg-gray-200 rounded-xl w-24" />
                            <div className="h-10 bg-gray-200 rounded-xl w-28" />
                        </div>
                    </div>

                    {/* Prompt Cards Skeleton */}
                    {[1, 2, 3, 4, 5].map((index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-2xl p-6"
                        >
                            <div className="flex gap-6">
                                {/* Vote Section */}
                                <div className="flex flex-col items-center gap-2 shrink-0">
                                    <div className="w-10 h-10 bg-gray-200 rounded-xl" />
                                    <div className="w-12 h-8 bg-gray-200 rounded-lg" />
                                    <div className="w-10 h-10 bg-gray-200 rounded-xl" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 space-y-4">
                                    {/* Title */}
                                    <div className="h-6 bg-gray-200 rounded-lg w-3/4" />

                                    {/* Description */}
                                    <div className="space-y-2">
                                        <div className="h-4 bg-gray-200 rounded w-full" />
                                        <div className="h-4 bg-gray-200 rounded w-5/6" />
                                    </div>

                                    {/* Tags */}
                                    <div className="flex gap-2">
                                        <div className="h-7 bg-gray-200 rounded-lg w-20" />
                                        <div className="h-7 bg-gray-200 rounded-lg w-24" />
                                        <div className="h-7 bg-gray-200 rounded-lg w-16" />
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                        <div className="flex gap-4">
                                            <div className="h-8 bg-gray-200 rounded-lg w-24" />
                                            <div className="h-8 bg-gray-200 rounded-lg w-20" />
                                        </div>
                                        <div className="h-6 bg-gray-200 rounded w-32" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    {/* CTA Card Skeleton */}
                    <div className="bg-gray-200 rounded-2xl h-64" />

                    {/* Stats Card Skeleton */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6">
                        <div className="h-6 bg-gray-200 rounded w-32 mb-4" />
                        <div className="space-y-4">
                            <div className="h-12 bg-gray-200 rounded-lg" />
                            <div className="h-12 bg-gray-200 rounded-lg" />
                            <div className="h-12 bg-gray-200 rounded-lg" />
                        </div>
                    </div>

                    {/* Tags Card Skeleton */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6">
                        <div className="h-6 bg-gray-200 rounded w-28 mb-4" />
                        <div className="flex flex-wrap gap-2">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="h-8 bg-gray-200 rounded-lg w-20" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};