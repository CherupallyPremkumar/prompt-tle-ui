import React from 'react';
import { Loader2 } from 'lucide-react';

interface InfiniteScrollTriggerProps {
    hasMore: boolean;
    isLoading: boolean;
    onLoadMore: () => void;
    loadMoreRef: React.RefObject<HTMLDivElement>;
}

export const InfiniteScrollTrigger: React.FC<InfiniteScrollTriggerProps> = ({
    hasMore,
    isLoading,
    onLoadMore,
    loadMoreRef
}) => {
    if (!hasMore) {
        return (
            <div className="text-center py-12 border-t border-gray-200">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-full mb-4">
                    <span className="text-2xl">🎉</span>
                </div>
                <p className="text-lg font-bold text-gray-900 mb-1">You've reached the end!</p>
                <p className="text-sm text-gray-500">No more prompts to load</p>
            </div>
        );
    }

    return (
        <div ref={loadMoreRef} className="py-8">
            {isLoading ? (
                <div className="flex items-center justify-center gap-3 text-gray-600">
                    <Loader2 className="w-5 h-5 animate-spin text-orange-600" />
                    <span className="font-medium">Loading more prompts...</span>
                </div>
            ) : (
                <button
                    onClick={onLoadMore}
                    className="mx-auto block px-8 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50 font-bold transition-all group"
                >
                    <span className="flex items-center gap-2">
                        Load More Prompts
                        <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </span>
                </button>
            )}
        </div>
    );
};
