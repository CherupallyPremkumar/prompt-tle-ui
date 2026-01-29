import { apiClient } from '../core/api/client';
import type {
    SearchRequest,
    SearchResponse,
    PromptSearchFilters,
    AnswerSearchFilters,
    CommentSearchFilters,
    FlagSearchFilters
} from '../types/query.types';
import type { Prompt, Answer, Comment } from '../types/prompt.types';
import type { ApiResponse } from '../types/api.types';
import { QUERY_ENDPOINTS, DEFAULT_PAGE_SIZE } from '../config/query.config';
import { API_CONFIG } from '../config/api.config';
import { mockDataService } from '../mocks/mockData';

class QueryService {
    /**
     * Search prompts using Chenile query service
     */
    async searchPrompts(
        filters: PromptSearchFilters,
        page: number = 1,
        pageSize: number = DEFAULT_PAGE_SIZE,
        sortCriteria?: Array<{ name: string; ascendingOrder: boolean }>
    ): Promise<SearchResponse<Prompt>> {
        if (API_CONFIG.USE_MOCKS) {
            // Simplified mapping for mock data
            let filter: 'hot' | 'newest' | 'unanswered' = 'hot';
            if (filters.answerCount === 0) filter = 'unanswered';

            // Pass the first tag if present (mock supports one tag for simplicity here)
            const tagName = filters.tags && filters.tags.length > 0 ? filters.tags[0] : undefined;
            return mockDataService.getPrompts(filter, page, pageSize, tagName) as any;
        }

        const request: SearchRequest<PromptSearchFilters> = {
            filters,
            pageNum: page,
            numRowsInPage: pageSize,
            sortCriteria,
        };

        const response = await apiClient.post<ApiResponse<SearchResponse<Prompt>>>(
            QUERY_ENDPOINTS.PROMPT_SEARCH,
            request
        );

        return response.data.payload;
    }

    /**
     * Get answers for a prompt
     */
    async getAnswers(promptId: string): Promise<SearchResponse<Answer>> {
        const request: SearchRequest<AnswerSearchFilters> = {
            filters: { promptId },
        };

        const response = await apiClient.post<ApiResponse<SearchResponse<Answer>>>(
            QUERY_ENDPOINTS.PROMPT_GET_ANSWERS,
            request
        );

        return response.data.payload;
    }

    /**
     * Get comments for a prompt
     */
    async getComments(promptId: string): Promise<SearchResponse<Comment>> {
        const request: SearchRequest<CommentSearchFilters> = {
            filters: { promptId },
        };

        const response = await apiClient.post<ApiResponse<SearchResponse<Comment>>>(
            QUERY_ENDPOINTS.PROMPT_GET_COMMENTS,
            request
        );

        return response.data.payload;
    }

    /**
     * Get pending flags (admin/moderator)
     */
    async getFlags(status: string = 'PENDING'): Promise<SearchResponse<any>> {
        const request: SearchRequest<FlagSearchFilters> = {
            filters: { status: status as any },
        };

        const response = await apiClient.post<ApiResponse<SearchResponse<any>>>(
            QUERY_ENDPOINTS.PROMPT_GET_FLAGS,
            request
        );

        return response.data.payload;
    }
}

export const queryService = new QueryService();
