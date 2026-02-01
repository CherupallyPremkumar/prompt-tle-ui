import { LucideIcon } from 'lucide-react';

// Re-export types from main types file
export type { AllowedAction } from '@/types/prompt.types';

// Comment type
export interface Comment {
    id: string;
    content: string;
    author: string;
    createdAt: string;
}

// Answer type
export interface Answer {
    id: string;
    body: string;
    score: number;
    isAccepted?: boolean;
    authorUsername: string;
    userId: string;
    createdAt?: string;
}

// Prompt type
export interface Prompt {
    id: string;
    title: string;
    description: string;
    body?: string;
    tags: string[];
    score: number;
    viewCount: number;
    favoriteCount: number;
    commentCount: number;
    answerCount: number;
    validationScore: number;
    authorUsername: string;
    userId: string;
    createdTime: string;
    lastModifiedTime: string;
    currentState?: {
        stateId: string;
    };
    stateId?: string;
    comments: Comment[];
    answers: Answer[];
    allowedActions: any[];
}

// Action config type
export interface ActionConfig {
    label: string;
    icon: LucideIcon;
    variant: 'primary' | 'outline' | 'ghost';
    position: 'header' | 'inline' | 'hidden';
}