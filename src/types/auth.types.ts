export interface User {
    id: string;
    email: string;
    fullName: string | null;
    username: string | null;
    bio: string | null;
    pictureUrl: string | null;
    provider: string;
    providerId: string | null;
    status: string;
    isActive: boolean;
    emailVerified: boolean;
    createdAt: string;
    lastLogin: string | null;
    roles: Role[];
    reputation?: UserReputation;
}

export interface Role {
    id: string;
    name: string;
    description: string | null;
    acls: Acl[];
}

export interface Acl {
    id: string;
    name: string;
    description: string | null;
}

export interface UserReputation {
    userId: string;
    totalReputation: number;
    tagReputation: Record<string, number>;
    badges: Badge[];
}

export interface Badge {
    id: string;
    name: string;
    description: string | null;
    type: string;
    iconUrl: string | null;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface PendingAction {
    type: string;
    payload?: any;
    callback?: (success: boolean) => void;
}
