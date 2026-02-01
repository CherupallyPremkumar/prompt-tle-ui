import { apiClient } from '../core/api/client';
import type {
    SearchRequest,
    SearchResponse,
    SortCriterion,
    PromptSearchFilters
} from '@/types';
import type { Prompt, Answer, Comment } from '@/types';
import type { ApiResponse } from '@/types';
import { DEFAULT_PAGE_SIZE } from '../config/query.config';

/**
 * Custom error class for query service errors
 */
class QueryServiceError extends Error {
    constructor(
        message: string,
        public readonly queryName: string,
        public readonly statusCode?: number,
        public readonly originalError?: unknown
    ) {
        super(message);
        this.name = 'QueryServiceError';
    }
}

/**
 * Response cache entry
 */
interface CacheEntry<T> {
    data: SearchResponse<T>;
    timestamp: number;
}

/**
 * Service for handling Chenile query operations
 */
class QueryService {
    private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes
    private readonly responseCache = new Map<string, CacheEntry<any>>();

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
        // Validate inputs
        this.validateSearchParams(queryName, page, pageSize);

        // Check cache first
        const cacheKey = this.generateCacheKey(queryName, filters, page, pageSize, sortCriteria);
        const cachedResponse = this.getFromCache<T>(cacheKey);
        if (cachedResponse) {
            return cachedResponse;
        }

        try {

            // Make API request
            const response = await this.makeSearchRequest<T>(
                queryName,
                filters,
                page,
                pageSize,
                sortCriteria
            );

            // Cache the response
            this.setCache(cacheKey, response);

            return response;
        } catch (error) {
            throw this.handleError(error, queryName);
        }
    }

    /**
     * Search prompts using Chenile query service
     */
    async searchPrompts(
        filters: PromptSearchFilters = {},
        page: number = 1,
        pageSize: number = DEFAULT_PAGE_SIZE,
        sortCriteria?: SortCriterion[]
    ): Promise<SearchResponse<Prompt>> {
        return this.search<Prompt>(
            'prompt.searchDetailed',
            filters,
            page,
            pageSize,
            sortCriteria
        );
    }

    /**
     * Get answers for a prompt
     */
    async getAnswers(promptId: string): Promise<SearchResponse<Answer>> {
        if (!promptId?.trim()) {
            throw new QueryServiceError(
                'Prompt ID is required',
                'prompt.getAnswers'
            );
        }

        return this.search<Answer>('prompt.getAnswers', { promptId });
    }

    /**
     * Get comments for a prompt
     */
    async getComments(promptId: string): Promise<SearchResponse<Comment>> {
        if (!promptId?.trim()) {
            throw new QueryServiceError(
                'Prompt ID is required',
                'prompt.getComments'
            );
        }

        return this.search<Comment>('prompt.getComments', { promptId });
    }

    /**
     * Get pending flags (admin/moderator)
     */
    async getFlags(status: string = 'PENDING'): Promise<SearchResponse<any>> {
        return this.search<any>('prompt.getFlags', { status });
    }

    /**
     * Clear all cached responses
     */
    clearCache(): void {
        this.responseCache.clear();
    }

    /**
     * Clear cache for specific query
     */
    clearQueryCache(queryName: string): void {
        const keysToDelete: string[] = [];

        for (const key of this.responseCache.keys()) {
            if (key.startsWith(queryName)) {
                keysToDelete.push(key);
            }
        }

        keysToDelete.forEach(key => this.responseCache.delete(key));
    }

    // ========================================
    // Private Methods
    // ========================================

    /**
     * Validate search parameters
     */
    private validateSearchParams(
        queryName: string,
        page: number,
        pageSize: number
    ): void {
        if (!queryName?.trim()) {
            throw new QueryServiceError(
                'Query name is required',
                queryName
            );
        }

        if (page < 1) {
            throw new QueryServiceError(
                'Page number must be >= 1',
                queryName
            );
        }

        if (pageSize < 1 || pageSize > 100) {
            throw new QueryServiceError(
                'Page size must be between 1 and 100',
                queryName
            );
        }
    }

    /**
     * Make API search request
     */
    /**
     * Make API search request
     */
    private async makeSearchRequest<T>(
        queryName: string,
        filters: any,
        page: number,
        pageSize: number,
        sortCriteria?: SortCriterion[]
    ): Promise<SearchResponse<T>> {
        const request: SearchRequest<unknown> = {
            filters: this.sanitizeFilters(filters),
            pageNum: page,
            numRowsInPage: pageSize,
            sortCriteria,
            queryName
        };

        const response = await apiClient.post<ApiResponse<SearchResponse<T>>>(
            `/q/${queryName}`,
            request
        );

        // Validate response structure
        if (!response.data || !response.data.payload) {
            throw new QueryServiceError(
                'Invalid response structure from API',
                queryName
            );
        }

        return this.normalizeResponse(response.data.payload);
    }
    /**
     * Sanitize filter values to prevent issues
     */
    private sanitizeFilters(filters: Record<string, unknown>): Record<string, unknown> {
        const sanitized: Record<string, unknown> = {};

        for (const [key, value] of Object.entries(filters)) {
            // Skip null/undefined values
            if (value == null) continue;

            // Handle arrays
            if (Array.isArray(value)) {
                sanitized[key] = value.filter(v => v != null);
                continue;
            }

            // Handle strings - trim whitespace
            if (typeof value === 'string') {
                const trimmed = value.trim();
                if (trimmed) {
                    sanitized[key] = trimmed;
                }
                continue;
            }

            // Keep other types as-is
            sanitized[key] = value;
        }

        return sanitized;
    }

    /**
     * Normalizes backend data to match frontend expectations
     */
    private normalizeResponse<T>(payload: SearchResponse<T>): SearchResponse<T> {
        if (!payload?.list) {
            return payload;
        }

        // Normalize each row in the response
        payload.list.forEach((item) => {
            if (!item?.row) return;

            // We cast to any here because we are intentionally mutating the object properties
            // based on string keys, which is hard to type safely without strict schema
            const row = item.row as any;

            // Normalize tags (convert string to array)
            this.normalizeTags(row);

            // Normalize dates
            this.normalizeDates(row);

            // Normalize boolean fields
            this.normalizeBooleans(row);

            // Normalize numeric fields
            this.normalizeNumbers(row);
        });

        return payload;
    }

    /**
     * Normalize tags field
     */
    private normalizeTags(row: Record<string, any>): void {
        if (typeof row.tags === 'string') {
            row.tags = row.tags
                ? row.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean)
                : [];
        } else if (!Array.isArray(row.tags)) {
            row.tags = [];
        }
    }

    /**
     * Normalize date fields
     */
    private normalizeDates(row: Record<string, any>): void {
        const dateFields = [
            'createdTime',
            'lastModifiedTime',
            'stateEntryTime',
            'createdAt',
            'updatedAt',
            'closedAt',
            'lastValidatedAt'
        ];

        dateFields.forEach(field => {
            const value = row[field];

            if (!value) return;

            // Handle backend date format with AM/PM UTC
            if (typeof value === 'string') {
                if (value.includes(' AM UTC') || value.includes(' PM UTC')) {
                    row[field] = value
                        .replace(' ', 'T')
                        .replace(' AM UTC', ':00Z')
                        .replace(' PM UTC', ':00Z');
                }
            }
        });
    }

    /**
     * Normalize boolean fields
     */
    private normalizeBooleans(row: Record<string, any>): void {
        const booleanFields = [
            'isFeatured',
            'isActive',
            'emailVerified',
            'isAccepted'
        ];

        booleanFields.forEach(field => {
            if (field in row && row[field] != null) {
                row[field] = Boolean(row[field]);
            }
        });
    }

    /**
     * Normalize numeric fields
     */
    private normalizeNumbers(row: Record<string, any>): void {
        const numericFields = [
            'viewCount',
            'usageCount',
            'favoriteCount',
            'answerCount',
            'commentCount',
            'score',
            'validationScore',
            'revisionNumber'
        ];

        numericFields.forEach(field => {
            if (field in row && row[field] != null) {
                const value = Number(row[field]);
                row[field] = isNaN(value) ? 0 : value;
            }
        });
    }

    /**
     * Generate cache key for request
     */
    private generateCacheKey(
        queryName: string,
        filters: Record<string, unknown>,
        page: number,
        pageSize: number,
        sortCriteria?: SortCriterion[]
    ): string {
        const parts = [
            queryName,
            JSON.stringify(filters),
            page,
            pageSize,
            sortCriteria ? JSON.stringify(sortCriteria) : ''
        ];

        return parts.join('|');
    }

    /**
     * Get response from cache if valid
     */
    private getFromCache<T>(key: string): SearchResponse<T> | null {
        const entry = this.responseCache.get(key);

        if (!entry) return null;

        // Check if cache entry is still valid
        const age = Date.now() - entry.timestamp;
        if (age > this.CACHE_TTL) {
            this.responseCache.delete(key);
            return null;
        }

        return entry.data;
    }

    /**
     * Clean expired entries from cache
     */
    private cleanExpiredCache(): void {
        const now = Date.now();
        for (const [key, entry] of this.responseCache.entries()) {
            if (now - entry.timestamp > this.CACHE_TTL) {
                this.responseCache.delete(key);
            }
        }
    }

    /**
     * Store response in cache
     */
    private setCache<T>(key: string, data: SearchResponse<T>): void {
        // Remove expired entries first
        this.cleanExpiredCache();

        // If still over limit, remove oldest entries in batch
        if (this.responseCache.size >= 100) {
            // Remove 20% of entries (20 entries) to avoid frequent cleanup
            const entriesToRemove = Array.from(this.responseCache.keys()).slice(0, 20);
            entriesToRemove.forEach(k => this.responseCache.delete(k));
        }

        this.responseCache.set(key, {
            data,
            timestamp: Date.now()
        });
    }

    /**
     * Handle and transform errors
     */
    private handleError(error: unknown, queryName: string): QueryServiceError {
        // Already a QueryServiceError
        if (error instanceof QueryServiceError) {
            return error;
        }

        // Axios error
        if (this.isAxiosError(error)) {
            const statusCode = error.response?.status;
            const message = error.response?.data?.description || error.message;

            return new QueryServiceError(
                `Query failed: ${message}`,
                queryName,
                statusCode,
                error
            );
        }

        // Generic error
        const message = error instanceof Error ? error.message : 'Unknown error occurred';
        return new QueryServiceError(
            `Query failed: ${message}`,
            queryName,
            undefined,
            error
        );
    }

    /**
     * Type guard for Axios errors
     */
    private isAxiosError(error: unknown): error is {
        response?: { status: number; data?: { description?: string } };
        message: string;
    } {
        return (
            typeof error === 'object' &&
            error !== null &&
            'message' in error &&
            typeof (error as any).message === 'string'
        );
    }
}

// Export singleton instance
export const queryService = new QueryService();

// Export error class for consumers
export { QueryServiceError };