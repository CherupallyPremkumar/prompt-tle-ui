import { PromptState } from './prompt.types';

export interface ColumnMetadata {
    name: string;
    displayName?: string;
    type?: string;
    sortable?: boolean;
    filterable?: boolean;
    hidden?: boolean;
}

export interface CannedReport {
    name: string;
    displayName?: string;
    isPublic?: boolean;
}

/**
 * Chenile Query Service types
 */

export interface SearchRequest<T = any> {
    numRowsInPage?: number;
    pageNum?: number;
    sortCriteria?: SortCriterion[];
    filters?: T;
    systemFilters?: Record<string, any>;
    queryName?: string;
    cannedReportName?: string;
    fields?: string[];
    toDoList?: boolean;
    hiddenColumns?: string[];
    saveChangesToCannedReport?: boolean;
    publishCannedReportToEveryone?: boolean;
    isOrOperation?: boolean;
}

export interface SortCriterion {
    index?: number;
    name: string;
    ascendingOrder: boolean;
}

export interface SearchResponse<T = any> {
    numRowsReturned: number;
    currentPage: number;
    maxPages: number;
    numRowsInPage: number;
    startRow: number;
    endRow: number;
    maxRows: number;
    data?: ResponseRow<T>;
    list: ResponseRow<T>[];
    columnMetadata: Record<string, ColumnMetadata>;
    cannedReportName?: string;
    availableCannedReports?: CannedReport[];
    hiddenColumns?: string[];
}

export interface ResponseRow<T = any> {
    row: T;
    allowedActions?: Array<Record<string, string>>;
}


export interface QueryMetadata {
    id: string;
    name: string;
    flowColumn?: string;
    stateColumn?: string;
    lateColumn?: string | null;
    tendingLateColumn?: string | null;
    workflowName?: string;
    toDoList?: boolean;
    flexiblePropnames?: boolean;
    paginated?: boolean;
    acls?: string[];
    columnMetadata?: Record<string, ColumnMetadata>;
    sortable?: boolean;
}

// Prompt-specific filter types
export interface PromptSearchFilters {
    stateId?: PromptState;
    tags?: string[];
    userId?: string;
    authorUsername?: string;
    validationScore?: number;
    isFeatured?: boolean;
    taskType?: string;
    searchTerm?: string;
    answerCount?: number;
    commentCount?: number;
}

export interface AnswerSearchFilters {
    promptId: string;
    isAccepted?: boolean;
}

export interface CommentSearchFilters {
    promptId: string;
    isAccepted?: boolean; // Wait, CommentSearchFilters in provided code just had promptId
}

export interface FlagSearchFilters {
    status?: 'PENDING' | 'RESOLVED' | 'DISMISSED';
    entityType?: string;
}
