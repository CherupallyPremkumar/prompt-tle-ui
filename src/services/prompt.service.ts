import { apiClient } from '../core/api/client';
import type { Prompt } from '../types/prompt.types';
import type { ApiResponse, PromptActionPayload } from '../types/api.types';
import { API_CONFIG } from '../config/api.config';
import { mockDataService } from '../mocks/mockData';

class PromptService {
    /**
     * Get prompt by ID
     */
    async getPromptById(promptId: string): Promise<Prompt> {
        if (API_CONFIG.USE_MOCKS) {
            return mockDataService.getPromptById(promptId);
        }
        const response = await apiClient.get<ApiResponse<Prompt>>(
            `/api/prompts/${promptId}`
        );
        return response.data.payload;
    }

    /**
     * Create new prompt (protected)
     */
    async createPrompt(data: any): Promise<any> {
        if (API_CONFIG.USE_MOCKS) {
            const result = await mockDataService.createPrompt(data);
            return { mutatedEntity: result, transitionAction: { allowedAction: 'view' } };
        }
        const response = await apiClient.post<ApiResponse<PromptActionPayload>>(
            '/api/prompts',
            data
        );
        return response.data.payload;
    }

    /**
     * Upvote prompt (protected)
     */
    async upvote(promptId: string): Promise<PromptActionPayload> {
        if (API_CONFIG.USE_MOCKS) {
            const result = await mockDataService.upvote(promptId);
            return { mutatedEntity: result, transitionAction: { allowedAction: 'upvote' } } as any;
        }
        const response = await apiClient.post<ApiResponse<PromptActionPayload>>(
            `/api/prompts/${promptId}/actions/upvote`,
            {}
        );
        return response.data.payload;
    }

    /**
     * Downvote prompt (protected)
     */
    async downvote(promptId: string): Promise<PromptActionPayload> {
        if (API_CONFIG.USE_MOCKS) {
            const result = await mockDataService.downvote(promptId);
            return { mutatedEntity: result, transitionAction: { allowedAction: 'downvote' } } as any;
        }
        const response = await apiClient.post<ApiResponse<PromptActionPayload>>(
            `/api/prompts/${promptId}/actions/downvote`,
            {}
        );
        return response.data.payload;
    }

    /**
     * Remove vote (protected)
     */
    async removeVote(promptId: string): Promise<PromptActionPayload> {
        const response = await apiClient.post<ApiResponse<PromptActionPayload>>(
            `/api/prompts/${promptId}/actions/removeVote`,
            {}
        );
        return response.data.payload;
    }

    /**
     * Add comment (protected)
     */
    async addComment(
        promptId: string,
        content: string
    ): Promise<PromptActionPayload> {
        const response = await apiClient.post<ApiResponse<PromptActionPayload>>(
            `/api/prompts/${promptId}/actions/addComment`,
            { content }
        );
        return response.data.payload;
    }

    /**
     * Add answer (protected)
     */
    async addAnswer(
        promptId: string,
        body: string
    ): Promise<PromptActionPayload> {
        const response = await apiClient.post<ApiResponse<PromptActionPayload>>(
            `/api/prompts/${promptId}/actions/addAnswer`,
            { body }
        );
        return response.data.payload;
    }

    /**
     * Accept answer (protected)
     */
    async acceptAnswer(
        promptId: string,
        answerId: string
    ): Promise<PromptActionPayload> {
        const response = await apiClient.post<ApiResponse<PromptActionPayload>>(
            `/api/prompts/${promptId}/actions/acceptAnswer`,
            { answerId }
        );
        return response.data.payload;
    }

    /**
     * Add to favorites (protected)
     */
    async addFavorite(promptId: string): Promise<PromptActionPayload> {
        const response = await apiClient.post<ApiResponse<PromptActionPayload>>(
            `/api/prompts/${promptId}/actions/addFavorite`,
            {}
        );
        return response.data.payload;
    }

    /**
     * Remove from favorites (protected)
     */
    async removeFavorite(promptId: string): Promise<PromptActionPayload> {
        const response = await apiClient.post<ApiResponse<PromptActionPayload>>(
            `/api/prompts/${promptId}/actions/removeFavorite`,
            {}
        );
        return response.data.payload;
    }

    /**
     * Add tag (protected)
     */
    async addTag(promptId: string, tag: string): Promise<PromptActionPayload> {
        const response = await apiClient.post<ApiResponse<PromptActionPayload>>(
            `/api/prompts/${promptId}/actions/addTag`,
            { tag }
        );
        return response.data.payload;
    }

    /**
     * Close prompt (protected)
     */
    async closePrompt(
        promptId: string,
        reason: string
    ): Promise<PromptActionPayload> {
        const response = await apiClient.post<ApiResponse<PromptActionPayload>>(
            `/api/prompts/${promptId}/actions/close`,
            { reason }
        );
        return response.data.payload;
    }

    /**
     * Record impression (public)
     */
    async recordImpression(promptId: string): Promise<void> {
        await apiClient.post(`/api/prompts/${promptId}/actions/recordImpression`, {});
    }
}

export const promptService = new PromptService();
