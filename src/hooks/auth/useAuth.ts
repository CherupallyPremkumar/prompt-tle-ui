import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/auth.store.ts';
import { authService } from '@/services/auth.service.ts';
import type { User } from '@/types';
import toast from 'react-hot-toast';
import { logger } from '@/utils/logger';

/**
 * Production-level authentication hook with proper state synchronization
 * 
 * Features:
 * - Automatic session validation on mount
 * - Proper loading states
 * - Error handling
 * - State synchronization between React Query and Zustand
 * - OAuth callback handling
 */
export const useAuth = () => {
    const {
        user: storeUser,
        setUser,
        setAuthenticated,
        logout: storeLogout
    } = useAuthStore();
    const queryClient = useQueryClient();

    // Fetch current user session
    const {
        data: user,
        isLoading,
        error,
        refetch
    } = useQuery<User | null>({
        queryKey: ['me'],
        queryFn: async () => {
            try {
                const user = await authService.getCurrentUser();
                // console.log('[useAuth] Fetched user:', user?.username || 'null');
                return user ?? null;
            } catch (err: any) {
                // 401/403 means not authenticated - this is expected, not an error
                if (err.response?.status === 401 || err.response?.status === 403) {
                    // console.log('[useAuth] Not authenticated (401/403)');
                    return null;
                }
                // Other errors should be logged but not thrown
                logger.error('[useAuth] Error fetching user', err);
                return null;
            }
        },
        staleTime: Infinity, // Never automatically become stale during session
        gcTime: 1000 * 60 * 60, // 1 hour
        retry: false, // Don't retry 401s
        refetchOnWindowFocus: false, // Don't re-validate on window focus
        refetchOnReconnect: false, // Don't re-validate on reconnect
    });

    // Synchronize React Query state with Zustand store
    useEffect(() => {
        if (user) {
            // Only update store if user content has changed (deep compare check)
            // This prevents infinite loops if object reference changes but content is same
            if (JSON.stringify(user) !== JSON.stringify(storeUser)) {
                // console.log('[useAuth] Setting authenticated user:', user.username);
                setUser(user);
                setAuthenticated(true);
            }
        } else if (!isLoading && !user) {
            // Finished loading and no user found
            // console.log('[useAuth] Clearing authentication state');
            setUser(null);
            setAuthenticated(false);
        }
    }, [user, isLoading, setUser, setAuthenticated]);

    /**
     * Logout user and clear all state
     */
    const logout = async () => {
        try {
            // console.log('[useAuth] Logging out...');

            // Call logout API
            await authService.logout();

            // Clear React Query cache
            queryClient.setQueryData(['me'], null);
            queryClient.removeQueries({ queryKey: ['me'] });

            // Clear Zustand store
            storeLogout();

            // console.log('[useAuth] Logout successful');
            toast.success('Logged out successfully');
        } catch (err) {
            logger.error('[useAuth] Logout failed', err);

            // Even if API fails, clear local state
            queryClient.setQueryData(['me'], null);
            storeLogout();

            toast.error('Logout failed, but you have been signed out locally');
        }
    };

    /**
     * Handle OAuth callback and update auth state
     */
    const handleOAuthCallback = async (code: string, state?: string) => {
        try {
            // console.log('[useAuth] Handling OAuth callback...');

            const response = await authService.handleOAuthCallback(code, state);

            if (response.user) {
                // console.log('[useAuth] OAuth successful, user:', response.user.username);

                // Update both cache and store
                queryClient.setQueryData(['me'], response.user);
                setUser(response.user);
                setAuthenticated(true);

                toast.success(`Welcome back, ${response.user.username}!`);
            }

            return response;
        } catch (err: any) {
            logger.error('[useAuth] OAuth callback failed', err);

            // Clear any partial state
            queryClient.setQueryData(['me'], null);
            setUser(null);
            setAuthenticated(false);

            const errorMessage = err.response?.data?.description || 'Authentication failed';
            toast.error(errorMessage);

            throw err;
        }
    };

    /**
     * Manually refresh the current user
     */
    const refreshUser = async () => {
        // console.log('[useAuth] Manually refreshing user...');
        await refetch();
    };

    /**
     * Computed authentication state
     * Uses stale-while-revalidate: if we have ANY user data (cache or store), show as authenticated
     * This prevents layout flicker during navigation
     */
    const effectiveUser = user || storeUser;
    const isAuthenticated = !!effectiveUser;

    // Only show loading if we have NO user data AND we're actively fetching
    const actualLoading = isLoading && !effectiveUser;

    return {
        // User data
        user: effectiveUser,

        // Auth state
        isAuthenticated,
        isLoading: actualLoading,
        error,

        // Actions
        logout,
        handleOAuthCallback,
        refreshUser,
    };
};