import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { queryService } from '../../services/chenile-query.service';
import type { SearchResponse, PromptSearchFilters, SortCriterion } from '../../types/query.types';
import type { Prompt } from '../../types/prompt.types';

export const usePromptQuery = (
    filters: PromptSearchFilters,
    page: number = 1,
    pageSize: number = 20,
    sortCriteria?: SortCriterion[],
    options?: Omit<UseQueryOptions<SearchResponse<Prompt>>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<SearchResponse<Prompt>>({
        queryKey: ['prompts', 'search', filters, page, pageSize, sortCriteria],
        queryFn: () => queryService.searchPrompts(filters, page, pageSize, sortCriteria),
        ...options,
    });
};

export const usePromptAnswers = (promptId: string) => {
    return useQuery({
        queryKey: ['prompts', promptId, 'answers'],
        queryFn: () => queryService.getAnswers(promptId),
        enabled: !!promptId,
    });
};

export const usePromptComments = (promptId: string) => {
    return useQuery({
        queryKey: ['prompts', promptId, 'comments'],
        queryFn: () => queryService.getComments(promptId),
        enabled: !!promptId,
    });
};
