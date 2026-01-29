/**
 * Chenile Query Service configuration
 */

export const QUERY_ENDPOINTS = {
    PROMPT_SEARCH: '/q/prompt.search',
    PROMPT_GET_ANSWERS: '/q/prompt.getAnswers',
    PROMPT_GET_COMMENTS: '/q/prompt.getComments',
    PROMPT_GET_FLAGS: '/q/prompt.getFlags',
} as const;

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

export const PROMPT_DEFAULT_FIELDS = [
    'id',
    'title',
    'description',
    'tags',
    'score',
    'viewCount',
    'answerCount',
    'commentCount',
    'authorUsername',
    'createdTime',
    'currentState',
];
