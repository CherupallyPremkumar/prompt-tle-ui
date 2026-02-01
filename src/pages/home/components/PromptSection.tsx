import React, { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
    FilterTabs,
    PromptList,
    LoadingSkeleton,
    EmptyState,
    InfiniteScrollTrigger,
} from './index';
import { useHomeFilters } from '../hooks/useHomeFilters';
import { useInfinitePromptQuery } from '../hooks/useInfinitePromptQuery';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { FilterType } from '../index';

interface PromptSectionProps {
    tag?: string;
    onAskPrompt: () => void;
}

export const PromptSection: React.FC<PromptSectionProps> = ({ tag, onAskPrompt }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Get state from URL or use defaults
    const activeFilter = (searchParams.get('filter') as FilterType) || 'hot';

    const { filters, sortCriteria } = useHomeFilters(activeFilter, tag);

    // Use infinite query
    const {
        data,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfinitePromptQuery(filters, 20, sortCriteria);

    // Flatten all pages into single array
    const promptList = data?.pages.flatMap(page => page.list) || [];
    const totalCount = data?.pages[0]?.maxRows || 0;

    // Auto-load more when scrolling near bottom
    const handleLoadMore = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const loadMoreRef = useIntersectionObserver(handleLoadMore, {
        enabled: hasNextPage && !isFetchingNextPage
    });

    const handleFilterChange = (filter: FilterType) => {
        setSearchParams(params => {
            params.set('filter', filter);
            return params;
        });
        // Scroll to top when filter changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Determine empty state type
    const getEmptyStateType = (): 'no-prompts' | 'no-tag-results' | 'no-unanswered' => {
        if (tag) return 'no-tag-results';
        if (activeFilter === 'unanswered') return 'no-unanswered';
        return 'no-prompts';
    };

    if (error) {
        return (
            <div className="text-center py-20 text-red-600">
                <p>Failed to load prompts.</p>
                <p className="text-sm text-gray-500 mt-2">{error instanceof Error ? error.message : 'Unknown error'}</p>
            </div>
        );
    }

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    return (
        <div className="space-y-6">
            {/* Filter Tabs */}
            <FilterTabs
                activeFilter={activeFilter}
                onFilterChange={handleFilterChange}
                totalCount={totalCount}
            />

            {/* Prompts List or Empty State */}
            {promptList.length === 0 ? (
                <EmptyState
                    type={getEmptyStateType()}
                    tag={tag}
                    onAskPrompt={onAskPrompt}
                />
            ) : (
                <>
                    <PromptList prompts={promptList} />

                    {/* Infinite Scroll Trigger */}
                    <InfiniteScrollTrigger
                        hasMore={hasNextPage || false}
                        isLoading={isFetchingNextPage}
                        onLoadMore={handleLoadMore}
                        loadMoreRef={loadMoreRef}
                    />
                </>
            )}
        </div>
    );
};
