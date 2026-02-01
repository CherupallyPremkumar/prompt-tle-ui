import { apiClient } from '../core/api/client';
import { queryService } from './chenile-query.service';
import type { Prompt, AllowedAction } from '@/types';
import type { ApiResponse, PromptActionPayload, Payloads } from '../types/api.types';
import { API_CONFIG } from '../config/api.config';
import { mockDataService } from '../mocks/mockData';

class PromptService {
    /**
     * Get prompt by ID with all related data (comments, answers, etc.)
     */
    async getPromptById(promptId: string): Promise<Prompt> {


        // Use query service to get prompt details
        // Query ID 'prompt.view' maps to MyBatis 'prompt-view.view'
        const response = await queryService.search<Prompt>('prompt.view', { id: promptId });

        if (!response.list || response.list.length === 0) {
            throw new Error(`Prompt not found with ID: ${promptId}`);
        }

        const row = response.list[0].row;
        const allowedActions = response.list[0].allowedActions as any as AllowedAction[];

        const prompt = { ...row, allowedActions };

        if (prompt) {
            this.normalizePrompt(prompt);
        }

        return prompt;
    }

    /**
     * Create new prompt
     */
    async createPrompt(data: {
        title: string;
        description: string;
        tags: string[];
        imageUrl?: string;
        body?: string;
    }): Promise<PromptActionPayload> {
        if (API_CONFIG.USE_MOCKS) {
            const result = await mockDataService.createPrompt(data);
            return { mutatedEntity: result, allowedActionsAndMetadata: [] };
        }
        const response = await apiClient.post<ApiResponse<PromptActionPayload>>(
            '/prompt',
            data
        );
        const payload = response.data.payload;
        if (payload.mutatedEntity) {
            this.normalizePrompt(payload.mutatedEntity);
        }
        return payload;
    }

    /**
     * Generic transition helper for state machine actions
     */
    async transition(promptId: string, action: string, data: any = {}): Promise<PromptActionPayload> {
        const response = await apiClient.patch<ApiResponse<PromptActionPayload>>(
            `/prompt/${promptId}/${action}`,
            data
        );
        const payload = response.data.payload;
        if (payload.mutatedEntity) {
            this.normalizePrompt(payload.mutatedEntity);
        }
        return payload;
    }

    /**
     * Normalize prompt data from backend
     */
    private normalizePrompt(prompt: Prompt): Prompt {
        if (!prompt) return prompt;
        // We handle the incoming prompt relative to its potential raw state from backend
        // Use a type intersection or similar if strictness is required, for now treating field access safely
        const p = prompt as unknown as Record<string, unknown>;

        // Normalize tags: convert comma-separated string to array
        if (typeof p.tags === 'string') {
            prompt.tags = p.tags ? p.tags.split(',').map((t: string) => t.trim()) : [];
        }

        // Normalize dates: handle non-standard "2026-01-30 05:38 AM UTC" format
        const dateFields = ['createdTime', 'lastModifiedTime', 'stateEntryTime', 'lastValidatedAt'];
        dateFields.forEach(field => {
            const val = p[field];
            if (typeof val === 'string' && (val.includes(' AM UTC') || val.includes(' PM UTC'))) {
                // Convert to ISO format or at least something Date can parse
                const withoutUTC = val.replace(' UTC', '');
                const date = new Date(withoutUTC);
                if (!isNaN(date.getTime())) {
                    (prompt as any)[field] = date.toISOString();
                }
            }
        });

        // Normalize comments if present
        if (Array.isArray(p.comments)) {
            p.comments.forEach((comment: any) => {
                if (typeof comment.createdAt === 'string' &&
                    (comment.createdAt.includes(' AM UTC') || comment.createdAt.includes(' PM UTC'))) {
                    const withoutUTC = comment.createdAt.replace(' UTC', '');
                    const date = new Date(withoutUTC);
                    if (!isNaN(date.getTime())) {
                        comment.createdAt = date.toISOString();
                    }
                }
            });
        }

        // Normalize answers if present
        if (Array.isArray(p.answers)) {
            p.answers.forEach((answer: any) => {
                if (answer.createdAt && typeof answer.createdAt === 'string' &&
                    (answer.createdAt.includes(' AM UTC') || answer.createdAt.includes(' PM UTC'))) {
                    const withoutUTC = answer.createdAt.replace(' UTC', '');
                    const date = new Date(withoutUTC);
                    if (!isNaN(date.getTime())) {
                        answer.createdAt = date.toISOString();
                    }
                }
            });
        }

        return prompt;
    }

    // ============================================================================
    // STATE TRANSITION ACTIONS
    // ============================================================================

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
     * Open prompt
     */
    async open(promptId: string): Promise<PromptActionPayload> {
        return this.transition(promptId, 'open');
    }

    /**
     * Close prompt
     */
    async close(promptId: string, reason: string, comment: string = 'Closing'): Promise<PromptActionPayload> {
        return this.transition(promptId, 'close', { reason, comment });
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

    // ============================================================================
    // VOTING ACTIONS
    // ============================================================================

    /**
     * Upvote prompt
     */
    async upvote(promptId: string, userId: string = 'current-user'): Promise<PromptActionPayload> {
        if (API_CONFIG.USE_MOCKS) {
            const result = await mockDataService.upvote(promptId);
            return { mutatedEntity: result!, allowedActionsAndMetadata: [] };
        }
        return this.transition(promptId, 'upvote', { userId });
    }

    /**
     * Downvote prompt
     */
    async downvote(promptId: string, userId: string = 'current-user'): Promise<PromptActionPayload> {
        if (API_CONFIG.USE_MOCKS) {
            const result = await mockDataService.downvote(promptId);
            return { mutatedEntity: result!, allowedActionsAndMetadata: [] };
        }
        return this.transition(promptId, 'downvote', { userId });
    }

    /**
     * Remove vote
     */
    async removeVote(promptId: string): Promise<PromptActionPayload> {
        return this.transition(promptId, 'removeVote');
    }

    // ============================================================================
    // COMMENT ACTIONS
    // ============================================================================

    /**
     * Add comment to prompt
     */
    async addComment(
        promptId: string,
        content: string,
        authorUsername: string = 'current-user'
    ): Promise<PromptActionPayload> {
        return this.transition(promptId, 'addComment', { content, authorUsername });
    }

    /**
     * Edit comment
     */
    async editComment(
        promptId: string,
        commentId: string,
        content: string
    ): Promise<PromptActionPayload> {
        return this.transition(promptId, 'editComment', { commentId, content });
    }

    /**
     * Delete comment
     */
    async deleteComment(promptId: string, commentId: string): Promise<PromptActionPayload> {
        return this.transition(promptId, 'deleteComment', { commentId });
    }

    // ============================================================================
    // ANSWER ACTIONS
    // ============================================================================

    /**
     * Add answer to prompt
     */
    async addAnswer(
        promptId: string,
        body: string,
        authorUsername: string = 'current-user'
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
     * Edit answer
     */
    async editAnswer(
        promptId: string,
        answerId: string,
        body: string
    ): Promise<PromptActionPayload> {
        return this.transition(promptId, 'editAnswer', { answerId, body });
    }

    /**
     * Delete answer
     */
    async deleteAnswer(promptId: string, answerId: string): Promise<PromptActionPayload> {
        return this.transition(promptId, 'deleteAnswer', { answerId });
    }

    // ============================================================================
    // REVISION ACTIONS
    // ============================================================================

    /**
     * Add revision to prompt
     */
    async addRevision(
        promptId: string,
        newContent: string,
        changeComment: string
    ): Promise<PromptActionPayload> {
        return this.transition(promptId, 'addRevision', { newContent, changeComment });
    }

    /**
     * Rollback to previous revision
     */
    async rollbackRevision(promptId: string, payload: Payloads.RollbackRevisionPayload): Promise<PromptActionPayload> {
        return this.transition(promptId, 'rollbackRevision', payload);
    }

    // ============================================================================
    // BOUNTY ACTIONS
    // ============================================================================

    /**
     * Add bounty to prompt
     */
    async addBounty(promptId: string, payload: Payloads.AddBountyPayload): Promise<PromptActionPayload> {
        return this.transition(promptId, 'addBounty', payload);
    }

    /**
     * Award bounty to answer
     */
    async awardBounty(promptId: string, payload: Payloads.AwardBountyPayload): Promise<PromptActionPayload> {
        return this.transition(promptId, 'awardBounty', payload);
    }

    // ============================================================================
    // FAVORITE ACTIONS
    // ============================================================================

    /**
     * Add prompt to favorites
     */
    async addFavorite(promptId: string, userId: string = 'current-user'): Promise<PromptActionPayload> {
        return this.transition(promptId, 'addFavorite', { userId });
    }

    /**
     * Remove prompt from favorites
     */
    async removeFavorite(promptId: string, userId: string = 'current-user'): Promise<PromptActionPayload> {
        return this.transition(promptId, 'removeFavorite', { userId });
    }

    // ============================================================================
    // TAG ACTIONS
    // ============================================================================

    /**
     * Add tag to prompt
     */
    async addTag(promptId: string, tag: string): Promise<PromptActionPayload> {
        return this.transition(promptId, 'addTag', { tag });
    }

    /**
     * Remove tag from prompt
     */
    async removeTag(promptId: string, tag: string): Promise<PromptActionPayload> {
        return this.transition(promptId, 'removeTag', { tag });
    }

    // ============================================================================
    // OTHER ACTIONS
    // ============================================================================

    /**
     * Mark prompt as duplicate
     */
    async markDuplicate(
        promptId: string,
        duplicateOfPromptId: string,
        comment: string
    ): Promise<PromptActionPayload> {
        return this.transition(promptId, 'markDuplicate', { duplicateOfPromptId, comment });
    }

    /**
     * Flag prompt for moderation
     */
    async flag(promptId: string, payload: Payloads.FlagPromptPayload): Promise<PromptActionPayload> {
        return this.transition(promptId, 'flag', payload);
    }

    /**
     * Edit prompt content
     */
    async editPrompt(
        promptId: string,
        payload: { title?: string; description?: string; body?: string; tags?: string[] }
    ): Promise<PromptActionPayload> {
        return this.transition(promptId, 'editPrompt', payload);
    }

    /**
     * Record impression (page view) - public endpoint, no authentication required
     */
    async recordImpression(promptId: string, payload: Partial<Payloads.ImpressionPayload> = {}): Promise<void> {
        if (API_CONFIG.USE_MOCKS) return;
        const finalPayload = {
            promptId,
            timestamp: new Date().toISOString(),
            ...payload
        };
        await apiClient.post(`/prompt/${promptId}/recordImpression`, finalPayload);
    }

    /**
     * View prompt - might update view count or last accessed time
     */
    async viewPrompt(promptId: string): Promise<void> {
        if (API_CONFIG.USE_MOCKS) return;
        await this.recordImpression(promptId);
    }
}

export const promptService = new PromptService();