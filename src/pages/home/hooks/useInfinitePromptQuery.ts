import { useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { queryService } from '../../../services/chenile-query.service';
import type { SearchResponse, PromptSearchFilters, SortCriterion } from '../../types/query.types';
import type { Prompt } from '../../types/prompt.types';

export const useInfinitePromptQuery = (
    filters: PromptSearchFilters,
    pageSize: number = 20,
    sortCriteria?: SortCriterion[],
    options?: Omit<UseInfiniteQueryOptions<SearchResponse<Prompt>, Error, any>, 'queryKey' | 'queryFn' | 'getNextPageParam' | 'initialPageParam'>
) => {
    return useInfiniteQuery<SearchResponse<Prompt>>({
        queryKey: ['prompts', 'infinite', filters, pageSize, sortCriteria],
        queryFn: ({ pageParam = 1 }) =>
            queryService.searchPrompts(filters, pageParam as number, pageSize, sortCriteria),
        getNextPageParam: (lastPage) => {
            // Return next page number if there are more pages
            if (lastPage.currentPage < lastPage.maxPages) {
                return lastPage.currentPage + 1;
            }
            return undefined; // No more pages
        },
        initialPageParam: 1,
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        staleTime: 30000, // 30 seconds
        ...options,
    });
};
