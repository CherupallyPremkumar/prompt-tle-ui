import { LucideIcon } from 'lucide-react';
import { User, Prompt } from '@/types';

// Tab types
export type TabType = 'prompts' | 'answers' | 'activity';

// Stat configuration
export interface StatConfig {
    label: string;
    value: number | string;
    icon: LucideIcon;
    color: string;
    bg: string;
}

// User metadata item
export interface MetadataItem {
    icon: LucideIcon;
    label: string;
    color: string;
}

// Profile data hook return type
export interface ProfileData {
    user: User | null;
    userPrompts: Prompt[];
    loading: boolean;
    totalAnswers: number;
    totalVotes: number;
}

// Re-export common types that are used across components
export type { User, Prompt } from '@/types';