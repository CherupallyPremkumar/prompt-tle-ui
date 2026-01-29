/**
 * Backend DTOs for Prompt State Machine transitions
 * These align with the 'meta-bodyType' defined in prompt-states.xml
 */

export interface SubmitPromptPayload {
    comment?: string;
}

export interface ValidatePromptPayload {
    score: number;
    comment?: string;
}

export interface AddBountyPayload {
    promptId: string;
    userId: string;
    amount: number;
    description: string;
    durationDays: number;
    timestamp: number;
}

export interface AwardBountyPayload {
    answerId: string;
    amount: number;
}

export interface AddAnswerPayload {
    body: string;
    authorUsername: string;
    attachments?: any[];
}

export interface AcceptAnswerPayload {
    answerId: string;
    comment?: string;
}

export interface AddCommentPayload {
    content: string;
    authorUsername: string;
}

export interface UpvotePayload {
    userId: string;
}

export interface DownvotePayload {
    userId: string;
}

export interface RemoveVotePayload {
    userId: string;
}

export interface AddRevisionPayload {
    newContent: string;
    changeComment: string;
}

export interface RollbackRevisionPayload {
    entityType: string;
    entityId: string;
    targetRevisionNumber: number;
    userId: string;
    reason: string;
    timestamp: number;
}

export interface MarkDuplicatePayload {
    duplicateOfPromptId: string;
    comment: string;
}

export interface ClosePromptPayload {
    reason: string;
    comment?: string;
}

export interface ReopenPromptPayload {
    reason?: string;
}

export interface DeprecatePromptPayload {
    reason: string;
}

export interface FlagPromptPayload {
    reason: string;
    type: string;
}

export interface AddTagPayload {
    tag: string;
}

export interface RemoveTagPayload {
    tag: string;
}

export interface AddFavoritePayload {
    userId: string;
}

export interface RemoveFavoritePayload {
    userId: string;
}

export interface ImpressionPayload {
    promptId: string;
    viewerId?: string;
    timestamp: number;
}

export interface EditPromptPayload {
    title: string;
    description: string;
    tags: string[];
}
