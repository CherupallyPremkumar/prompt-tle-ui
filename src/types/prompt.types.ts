/**
 * Maps to your database schema and API responses
 */

// Prompt state from state machine
export type PromptState =
    | 'DRAFT'
    | 'OPEN'
    | 'BOUNTIED'
    | 'ANSWERED'
    | 'VALIDATED'
    | 'CLOSED'
    | 'DUPLICATE'
    | 'DEPRECATED';

// Vote types
export type VoteType = 'UPVOTE' | 'DOWNVOTE';

// Action from allowedActionsAndMetadata
export interface AllowedAction {
    allowedAction: string;
    bodyType?: string;
}

// Current state from API response
export interface CurrentState {
    stateId: PromptState;
    flowId: string;
}

// Main Prompt entity matching your DB schema
export interface Prompt {
    // BaseJpaEntity fields
    id: string;
    createdTime: string;
    lastModifiedTime: string;
    lastModifiedBy: string | null;
    createdBy: string | null;
    tenant: string;
    version: number;

    // AbstractJpaStateEntity fields
    stateEntryTime: string;
    slaYellowDate: string | null;
    slaRedDate: string | null;
    slaTendingLate: number;
    slaLate: number;
    flowId: string | null;
    stateId: string | null;

    // Prompt fields
    slug: string | null;
    isFeatured: boolean;
    forkedFromPromptId: string | null;
    title: string;
    description: string;
    template: string | null;
    body: string | null;
    systemPrompt: string | null;
    taskType: string | null;
    validationScore: number;
    lastValidatedAt: string | null;
    semanticVersion: string | null;
    parentVersionId: string | null;
    changelog: string | null;
    recommendedModel: string | null;
    userId: string;
    authorUsername: string | null;
    usageCount: number;
    viewCount: number;
    favoriteCount: number;
    score: number;
    acceptedAnswerId: string | null;
    duplicateOfPromptId: string | null;
    closeReason: string | null;
    closedAt: string | null;
    closedByUserId: string | null;
    revisionNumber: number;
    imageUrl: string | null;
    creatorRole: string | null;
    answerCount: number;
    commentCount: number;

    // Relations
    tags: string[];
    answers: Answer[];
    comments: Comment[];
    attachments: Attachment[];
    activities: PromptActivity[];
    revisions: PromptRevision[];
    testCases: TestCase[];
    modelCompatibility: ModelCompatibility[];
    variables: Variable[];

    // State machine
    currentState: CurrentState;

    // Allowed actions (critical for UI)
    allowedActions?: AllowedAction[];
}

export interface Answer {
    id: string;
    promptId: string;
    userId: string | null;
    authorUsername: string;
    body: string;
    score: number;
    isAccepted: boolean;
    createdAt: string;
    updatedAt: string;
    commentCount: number;
    revisionNumber: number;
    attachments: Attachment[];
    comments?: Comment[];
    createdTime: string;
    lastModifiedTime: string;
    tenant: string;
    version: number;
}

export interface Comment {
    id: string;
    promptId: string;
    author: string | null;
    content: string;
    createdAt: string;
    createdTime: string;
    lastModifiedTime: string;
    tenant: string;
    version: number;
}

export interface PromptVote {
    id: string;
    userId: string;
    promptId: string;
    voteType: VoteType;
    createdTime: string;
}

export interface Attachment {
    id: string;
    url: string;
    caption: string | null;
    mimeType: string | null;
    entityType: string;
    entityId: string;
}

export interface PromptActivity {
    id: string;
    activityName: string;
    activitySuccess: boolean;
    activityComment: string | null;
    promptId: string;
}

export interface PromptRevision {
    id: string;
    promptId: string;
    revisionNumber: number;
    userId: string;
    title: string;
    body: string;
    changeComment: string | null;
    createdAt: string;
    tags: string[];
}

export interface TestCase {
    id: string;
    promptId: string;
    inputValues: string;
    expectedOutput: string;
}

export interface ModelCompatibility {
    id: string;
    promptId: string;
    modelId: string;
    status: string;
    testedAt: string | null;
    testPassRate: number | null;
    notes: string | null;
}

export interface Variable {
    id: string;
    promptId: string;
    name: string;
    type: string;
    description: string | null;
    required: boolean;
    defaultValue: string | null;
    example: string | null;
}

export interface Bounty {
    id: string;
    promptId: string;
    sponsorUserId: string;
    amount: number;
    description: string;
    startedAt: string;
    expiresAt: string;
    awardedToAnswerId: string | null;
    awardedToUserId: string | null;
    awardedAt: string | null;
    status: string;
}

export interface Favorite {
    id: string;
    userId: string;
    promptId: string;
    addedAt: string;
    notes: string | null;
    customTags: string[];
}
