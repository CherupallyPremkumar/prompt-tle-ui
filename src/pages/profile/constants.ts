// Default values
export const DEFAULT_BIO = "Crafting unique experiences through prompt engineering and logical design. Passionate about AI-driven creative workflows.";

export const DEFAULT_USERNAME = 'anonymous';

export const DEFAULT_DISPLAY_NAME = 'Anonymous Participant';

export const DEFAULT_LOCATION = 'Global Nexus';

// Messages
export const MESSAGES = {
    notFound: {
        title: 'Profile Missing',
        description: "We couldn't find the explorer you're looking for. They might have changed their username.",
        buttonText: 'Search Community',
    },
    emptyStates: {
        prompts: 'No prompts published yet',
        answers: {
            message: 'Answers ledger is restricted',
            subtitle: 'Complete 3 peer reviews to unlock full history',
        },
        activity: {
            message: 'Global Activity Stream',
            subtitle: 'Available for Level 2 Contributors',
        },
    },
} as const;

// UI Labels
export const LABELS = {
    buttons: {
        message: 'Message',
        follow: 'Follow',
    },
    stats: {
        publishedPrompts: 'Published Prompts',
        solutionsProvided: 'Solutions Provided',
        communityScore: 'Community Score',
        weeklyImpact: 'Weekly Impact',
    },
    tabs: {
        prompts: 'Prompts',
        answers: 'Answers',
        activity: 'Activity',
    },
} as const;

// Stat colors (Tailwind classes)
export const STAT_COLORS = {
    prompts: {
        color: 'text-blue-500',
        bg: 'bg-blue-50',
    },
    answers: {
        color: 'text-green-500',
        bg: 'bg-green-50',
    },
    score: {
        color: 'text-yellow-500',
        bg: 'bg-yellow-50',
    },
    impact: {
        color: 'text-purple-500',
        bg: 'bg-purple-50',
    },
} as const;