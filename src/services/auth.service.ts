import { apiClient } from '../core/api/client';
import type { User } from '../types/auth.types';
import type { ApiResponse } from '../types/api.types';
import { API_CONFIG } from '../config/api.config';
import { mockUsers } from '../mocks/mockData';

class AuthService {
    /**
     * Initiate OAuth login
     */
    async initiateOAuth(provider: string): Promise<string> {
        if (API_CONFIG.USE_MOCKS) {
            // Simulate direct redirect to callback
            return `${window.location.origin}/auth/callback?code=mock_code`;
        }
        const response = await apiClient.get<ApiResponse<{ authUrl: string }>>(
            `/api/auth/oauth/${provider}`
        );
        return response.data.payload.authUrl;
    }

    /**
     * Get current user (works with cookie)
     */
    async getCurrentUser(): Promise<User> {
        if (API_CONFIG.USE_MOCKS) {
            return mockUsers[0];
        }
        const response = await apiClient.get<ApiResponse<User>>('/api/auth/me');
        return response.data.payload;
    }

    /**
     * Logout
     */
    async logout(): Promise<void> {
        await apiClient.post('/api/auth/logout');
    }

    /**
     * Handle OAuth callback (exchange code for user)
     */
    async handleOAuthCallback(code: string, state?: string): Promise<{ user: User }> {
        if (API_CONFIG.USE_MOCKS) {
            return { user: mockUsers[0] };
        }
        const response = await apiClient.post<ApiResponse<{ user: User }>>(
            '/api/auth/oauth/callback',
            { code, state }
        );
        return response.data.payload;
    }
}

export const authService = new AuthService();
