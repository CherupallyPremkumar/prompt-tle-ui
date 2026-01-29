import { apiClient } from '../core/api/client';
import type {
    SearchRequest,
    SearchResponse,
    SortCriterion,
    PromptSearchFilters
} from '../types/query.types';
import type { Prompt, Answer, Comment } from '../types/prompt.types';
import type { ApiResponse } from '../types/api.types';
import { DEFAULT_PAGE_SIZE } from '../config/query.config';
import { API_CONFIG } from '../config/api.config';
import { mockDataService } from '../mocks/mockData';

class QueryService {
    /**
     * Generic search method for any Chenile query
     */
    async search<T>(
        queryName: string,
        filters: any = {},
        page: number = 1,
        pageSize: number = DEFAULT_PAGE_SIZE,
        sortCriteria?: SortCriterion[]
    ): Promise<SearchResponse<T>> {
        if (API_CONFIG.USE_MOCKS) {
            // Fallback to specific mock methods if they exist, or generic mock logic
            if (queryName.includes('prompt')) {
                let filter: 'hot' | 'newest' | 'unanswered' = 'hot';
                if (filters.answerCount === 0) filter = 'unanswered';
                const tagName = filters.tags && filters.tags.length > 0 ? filters.tags[0] : undefined;
                return mockDataService.getPrompts(filter, page, pageSize, tagName) as any;
            }
            if (queryName.includes('user')) {
                const users = await mockDataService.getUsers();
                return {
                    numRowsReturned: users.length,
                    currentPage: 1,
                    maxPages: 1,
                    numRowsInPage: pageSize,
                    startRow: 0,
                    endRow: users.length,
                    maxRows: users.length,
                    list: users.map(user => ({ row: user })),
                    columnMetadata: {}
                } as any;
            }
            if (queryName.includes('Category') || queryName.includes('Tags')) {
                const tags = await mockDataService.getTags();
                return {
                    numRowsReturned: tags.length,
                    currentPage: 1,
                    maxPages: 1,
                    numRowsInPage: pageSize,
                    startRow: 0,
                    endRow: tags.length,
                    maxRows: tags.length,
                    list: tags.map(tag => ({ row: tag })),
                    columnMetadata: {}
                } as any;
            }
        }

        const request: SearchRequest<any> = {
            filters,
            pageNum: page,
            numRowsInPage: pageSize,
            sortCriteria,
            queryName
        };

        const response = await apiClient.post<ApiResponse<SearchResponse<T>>>(
            `/q/${queryName}`,
            request
        );

        return response.data.payload;
    }

    /**
     * Search prompts using Chenile query service
     */
    async searchPrompts(
        filters: PromptSearchFilters,
        page: number = 1,
        pageSize: number = DEFAULT_PAGE_SIZE,
        sortCriteria?: SortCriterion[]
    ): Promise<SearchResponse<Prompt>> {
        return this.search<Prompt>('prompt.searchDetailed', filters, page, pageSize, sortCriteria);
    }

    /**
     * Get answers for a prompt
     */
    async getAnswers(promptId: string): Promise<SearchResponse<Answer>> {
        return this.search<Answer>('prompt.getAnswers', { promptId });
    }

    /**
     * Get comments for a prompt
     */
    async getComments(promptId: string): Promise<SearchResponse<Comment>> {
        return this.search<Comment>('prompt.getComments', { promptId });
    }

    /**
     * Get pending flags (admin/moderator)
     */
    async getFlags(status: string = 'PENDING'): Promise<SearchResponse<any>> {
        return this.search<any>('prompt.getFlags', { status });
    }
}

export const queryService = new QueryService();
