/**
 * Define which actions require authentication
 * Maps to allowedActions from API
 */

export const PUBLIC_ACTIONS = [
    'viewPrompt',
    'recordImpression',
] as const;

export const PROTECTED_ACTIONS = [
    'upvote',
    'downvote',
    'removeVote',
    'addComment',
    'addAnswer',
    'acceptAnswer',
    'editPrompt',
    'addTag',
    'removeTag',
    'addBounty',
    'awardBounty',
    'flag',
    'close',
    'reopen',
    'markDuplicate',
    'addFavorite',
    'removeFavorite',
    'addRevision',
    'validate',
    'deprecate',
    'submit',
    'approve',
    'reject',
    'rollbackRevision',
] as const;

export type PublicAction = typeof PUBLIC_ACTIONS[number];
export type ProtectedAction = typeof PROTECTED_ACTIONS[number];
export type Action = PublicAction | ProtectedAction;

export const isProtectedAction = (action: string): action is ProtectedAction => {
    // @ts-ignore
    return PROTECTED_ACTIONS.includes(action as ProtectedAction);
};

export const isPublicAction = (action: string): action is PublicAction => {
    // @ts-ignore
    return PUBLIC_ACTIONS.includes(action as PublicAction);
};

/**
 * Check if user can perform action based on allowedActions from API
 */
export const canPerformAction = (
    action: string,
    allowedActions?: { allowedAction: string }[]
): boolean => {
    if (!allowedActions) return false;
    return allowedActions.some(a => a.allowedAction === action);
};
