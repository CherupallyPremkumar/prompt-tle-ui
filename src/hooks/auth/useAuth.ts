import { useEffect } from 'react';
import { useAuthStore } from '../../store/auth.store';
import { authService } from '../../services/auth.service';

export const useAuth = () => {
    const {
        user,
        isAuthenticated,
        isLoading,
        error,
        setUser,
        setAuthenticated,
        setLoading,
        logout: storeLogout
    } = useAuthStore();

    useEffect(() => {
        const initAuth = async () => {
            try {
                setLoading(true);
                const currentUser = await authService.getCurrentUser();
                setUser(currentUser);
                setAuthenticated(true);
            } catch (err) {
                // Not authenticated or error
                setUser(null);
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        if (!user && isLoading) {
            initAuth();
        }
    }, [user, isLoading, setUser, setAuthenticated, setLoading]);

    const logout = async () => {
        try {
            await authService.logout();
            storeLogout();
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    const handleOAuthCallback = async (code: string, state?: string) => {
        try {
            setLoading(true);
            const response = await authService.handleOAuthCallback(code, state);
            setUser(response.user);
            setAuthenticated(true);
            return response;
        } catch (err) {
            console.error('OAuth callback failed', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        isAuthenticated,
        isLoading,
        error,
        logout,
        handleOAuthCallback
    };
};
