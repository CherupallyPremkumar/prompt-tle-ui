import {
    ArrowBigUp,
    ArrowBigDown,
    Bookmark,
    Flag,
    Award,
    LucideIcon,
    Archive,
    ShieldCheck,
    Play,
    ArrowUpCircle,
    AlertCircle,
    BookmarkPlus,
    Ban,
    Edit,
    History,
    Eye,
    MessageSquare,
} from 'lucide-react';

export interface ActionConfig {
    label: string;
    icon: LucideIcon;
    variant: 'primary' | 'outline' | 'ghost';
    position: 'header' | 'inline' | 'hidden';
}

export const ACTION_CONFIG: Record<string, ActionConfig> = {
    // Primary actions - shown in header
    submit: {
        label: 'Submit for Review',
        icon: ArrowUpCircle,
        variant: 'primary',
        position: 'header'
    },
    validate: {
        label: 'Validate',
        icon: ShieldCheck,
        variant: 'primary',
        position: 'header'
    },
    open: {
        label: 'Open',
        icon: Play,
        variant: 'primary',
        position: 'header'
    },

    // Secondary actions - shown in header
    addBounty: {
        label: 'Add Bounty',
        icon: Award,
        variant: 'outline',
        position: 'header'
    },
    rollbackRevision: {
        label: 'Rollback',
        icon: History,
        variant: 'outline',
        position: 'header'
    },
    reopen: {
        label: 'Reopen',
        icon: Play,
        variant: 'outline',
        position: 'header'
    },
    deprecate: {
        label: 'Deprecate',
        icon: Ban,
        variant: 'outline',
        position: 'header'
    },
    close: {
        label: 'Close',
        icon: Archive,
        variant: 'outline',
        position: 'header'
    },
    editPrompt: {
        label: 'Edit',
        icon: Edit,
        variant: 'outline',
        position: 'header'
    },

    // Inline actions - shown in sidebar
    addFavorite: {
        label: 'Favorite',
        icon: BookmarkPlus,
        variant: 'ghost',
        position: 'inline'
    },
    removeFavorite: {
        label: 'Remove Favorite',
        icon: Bookmark,
        variant: 'ghost',
        position: 'inline'
    },
    flag: {
        label: 'Flag',
        icon: Flag,
        variant: 'ghost',
        position: 'inline'
    },

    // Hidden actions - handled programmatically
    upvote: {
        label: 'Upvote',
        icon: ArrowBigUp,
        variant: 'ghost',
        position: 'hidden'
    },
    downvote: {
        label: 'Downvote',
        icon: ArrowBigDown,
        variant: 'ghost',
        position: 'hidden'
    },
    recordImpression: {
        label: 'Record View',
        icon: Eye,
        variant: 'ghost',
        position: 'hidden'
    },
    viewPrompt: {
        label: 'View',
        icon: Eye,
        variant: 'ghost',
        position: 'hidden'
    },
    addComment: {
        label: 'Comment',
        icon: MessageSquare,
        variant: 'ghost',
        position: 'hidden'
    },
    addAnswer: {
        label: 'Answer',
        icon: MessageSquare,
        variant: 'ghost',
        position: 'hidden'
    },
};

// Default fallback config
export const DEFAULT_ACTION_CONFIG: ActionConfig = {
    label: 'Action',
    icon: AlertCircle,
    variant: 'outline',
    position: 'header',
};

// Helper to get action config with fallback
export const getActionConfig = (actionId: string): ActionConfig => {
    return ACTION_CONFIG[actionId] || {
        ...DEFAULT_ACTION_CONFIG,
        label: actionId.replace(/([A-Z])/g, ' $1').trim(),
    };
};