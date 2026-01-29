import { Prompt, AllowedAction } from './prompt.types';

/**
 * API Response wrapper (from your backend)
 */
export interface ApiResponse<T = any> {
    code: number;
    description: string | null;
    errors: string[] | null;
    payload: T;
    severity: string | null;
    subErrorCode: number;
    success: boolean;
}

export interface PromptActionPayload {
    mutatedEntity: Prompt;
    allowedActionsAndMetadata: AllowedAction[];
}
