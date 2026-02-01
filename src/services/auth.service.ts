import { apiClient } from '../core/api/client';
import type { User, ApiResponse } from '@/types';

import { API_CONFIG } from '../config/api.config';

class AuthService {
    /**
     * Initiate OAuth login
     */
    async initiateOAuth(provider: string): Promise<string> {
        const redirectUri = window.location.origin + window.location.pathname;
        return `${API_CONFIG.BASE_URL}/oauth2/authorization/${provider}?redirect_uri=${encodeURIComponent(redirectUri)}`;
    }

    /**
     * Get current user (works with cookie)
     */
    async getCurrentUser(): Promise<User | null> {
        try {
            const response = await apiClient.get<ApiResponse<User>>('/api/auth/me');
            if (response.data && (response.data.payload || (response.data as any).data)) {
                const userData = response.data.payload || (response.data as any).data;
                // Normalize roles if they are strings
                if (userData.roles && userData.roles.length > 0 && typeof userData.roles[0] === 'string') {
                    userData.roles = (userData.roles as any).map((r: string) => ({ id: r, name: r }));
                }
                // Ensure ID exists (backend might not return it for Google users)
                if (!userData.id && userData.username) {
                    userData.id = userData.username;
                }
                if (!userData.fullName && userData.username) {
                    userData.fullName = userData.username;
                }
                return userData;
            }
            return null;
        } catch (error: unknown) {
            if (this.isAxiosError(error) && error.response?.status === 401) {
                return null;
            }
            throw error;
        }
    }

    /**
     * Handle OAuth callback
     */
    async handleOAuthCallback(code: string, state?: string): Promise<{ user: User }> {
        const response = await apiClient.get<ApiResponse<User>>(`/api/auth/oauth2/callback?code=${code}${state ? `&state=${state}` : ''}`);
        return { user: response.data.payload || (response.data as any).data };
    }

    /**
     * Send OTP to user's email
     */
    async sendOtp(email: string): Promise<void> {
        await apiClient.post('/api/auth/otp/send', { email });
    }

    /**
     * Verify OTP and authenticate user
     */
    async verifyOtp(email: string, code: string): Promise<{ user: User }> {
        const response = await apiClient.post<ApiResponse<User>>('/api/auth/otp/verify', { email, code });
        return { user: response.data.payload || (response.data as any).data };
    }

    private isAxiosError(error: unknown): error is { response?: { status: number } } {
        return typeof error === 'object' && error !== null && 'response' in error;
    }

    /**
     * Logout
     */
    async logout(): Promise<void> {
        await apiClient.post('/api/auth/logout');
    }
}

export const authService = new AuthService();
