import { apiClient } from '../core/api/client';
import type { Prompt } from '../types/prompt.types';
import type { ApiResponse, PromptActionPayload, Payloads } from '../types/api.types';
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
            `/prompt/${promptId}`
        );
        return response.data.payload;
    }

    /**
     * Create new prompt
     */
    async createPrompt(data: { title: string; description: string; tags: string[]; imageUrl?: string }): Promise<any> {
        if (API_CONFIG.USE_MOCKS) {
            const result = await mockDataService.createPrompt(data);
            return { mutatedEntity: result, allowedActionsAndMetadata: [] };
        }
        const response = await apiClient.post<ApiResponse<PromptActionPayload>>(
            '/prompt',
            data
        );
        return response.data.payload;
    }

    /**
     * Generic transition helper
     */
    private async transition(promptId: string, action: string, data: any = {}): Promise<PromptActionPayload> {
        const response = await apiClient.patch<ApiResponse<PromptActionPayload>>(
            `/prompt/${promptId}/${action}`,
            data
        );
        return response.data.payload;
    }

    /**
     * Submit prompt for review
     */
    async submit(promptId: string, comment: string = 'Submitting for review'): Promise<PromptActionPayload> {
        return this.transition(promptId, 'submit', { comment });
    }

    /**
     * Validate prompt (Moderator action)
     */
    async validate(promptId: string, score: number, comment: string = 'Validated'): Promise<PromptActionPayload> {
        return this.transition(promptId, 'validate', { score, comment });
    }

    /**
     * Upvote prompt
     */
    async upvote(promptId: string, userId: string = 'user123'): Promise<PromptActionPayload> {
        if (API_CONFIG.USE_MOCKS) {
            const result = await mockDataService.upvote(promptId);
            return { mutatedEntity: result!, allowedActionsAndMetadata: [] };
        }
        return this.transition(promptId, 'upvote', { userId });
    }

    /**
     * Remove vote
     */
    async removeVote(promptId: string): Promise<PromptActionPayload> {
        return this.transition(promptId, 'removeVote');
    }

    /**
     * Downvote prompt
     */
    async downvote(promptId: string): Promise<PromptActionPayload> {
        if (API_CONFIG.USE_MOCKS) {
            const result = await mockDataService.downvote(promptId);
            return { mutatedEntity: result!, allowedActionsAndMetadata: [] };
        }
        return this.transition(promptId, 'downvote');
    }

    /**
     * Add comment
     */
    async addComment(
        promptId: string,
        content: string,
        authorUsername: string = 'user'
    ): Promise<PromptActionPayload> {
        return this.transition(promptId, 'addComment', { content, authorUsername });
    }

    /**
     * Add answer
     */
    async addAnswer(
        promptId: string,
        body: string,
        authorUsername: string = 'expert'
    ): Promise<PromptActionPayload> {
        return this.transition(promptId, 'addAnswer', { body, authorUsername });
    }

    /**
     * Accept answer
     */
    async acceptAnswer(
        promptId: string,
        answerId: string,
        comment: string = 'Accepted'
    ): Promise<PromptActionPayload> {
        return this.transition(promptId, 'acceptAnswer', { answerId, comment });
    }

    /**
     * Add revision
     */
    async addRevision(
        promptId: string,
        newContent: string,
        changeComment: string
    ): Promise<PromptActionPayload> {
        return this.transition(promptId, 'addRevision', { newContent, changeComment });
    }

    /**
     * Mark as duplicate
     */
    async markDuplicate(
        promptId: string,
        duplicateOfPromptId: string,
        comment: string
    ): Promise<PromptActionPayload> {
        return this.transition(promptId, 'markDuplicate', { duplicateOfPromptId, comment });
    }

    /**
     * Close prompt
     */
    async closePrompt(
        promptId: string,
        reason: string,
        comment: string = 'Closing'
    ): Promise<PromptActionPayload> {
        return this.transition(promptId, 'close', { reason, comment });
    }

    /**
     * Add to favorites
     */
    async addFavorite(promptId: string, userId: string): Promise<PromptActionPayload> {
        return this.transition(promptId, 'addFavorite', { userId });
    }

    /**
     * Remove from favorites
     */
    async removeFavorite(promptId: string, userId: string): Promise<PromptActionPayload> {
        return this.transition(promptId, 'removeFavorite', { userId });
    }

    /**
     * Add Bounty
     */
    async addBounty(promptId: string, payload: Payloads.AddBountyPayload): Promise<PromptActionPayload> {
        return this.transition(promptId, 'addBounty', payload);
    }

    /**
     * Award Bounty
     */
    async awardBounty(promptId: string, payload: Payloads.AwardBountyPayload): Promise<PromptActionPayload> {
        return this.transition(promptId, 'awardBounty', payload);
    }

    /**
     * Rollback Revision
     */
    async rollbackRevision(promptId: string, payload: Payloads.RollbackRevisionPayload): Promise<PromptActionPayload> {
        return this.transition(promptId, 'rollbackRevision', payload);
    }

    /**
     * Reopen prompt
     */
    async reopen(promptId: string, payload: Payloads.ReopenPromptPayload = {}): Promise<PromptActionPayload> {
        return this.transition(promptId, 'reopen', payload);
    }

    /**
     * Deprecate prompt
     */
    async deprecate(promptId: string, payload: Payloads.DeprecatePromptPayload): Promise<PromptActionPayload> {
        return this.transition(promptId, 'deprecate', payload);
    }

    /**
     * Flag prompt
     */
    async flag(promptId: string, payload: Payloads.FlagPromptPayload): Promise<PromptActionPayload> {
        return this.transition(promptId, 'flag', payload);
    }

    /**
     * Record impression (public)
     */
    async recordImpression(promptId: string, payload: Payloads.ImpressionPayload): Promise<void> {
        if (API_CONFIG.USE_MOCKS) return;
        await apiClient.post(`/prompt/${promptId}/recordImpression`, payload);
    }
}

export const promptService = new PromptService();
