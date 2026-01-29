import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { AuthState, User } from '../types/auth.types';

interface AuthStore extends AuthState {
    setUser: (user: User | null) => void;
    setAuthenticated: (isAuthenticated: boolean) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    login: (user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
    devtools(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isLoading: true,
            error: null,

            setUser: (user) => set({ user }),
            setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
            setLoading: (isLoading) => set({ isLoading }),
            setError: (error) => set({ error }),

            login: (user) => set({ user, isAuthenticated: true, error: null }),
            logout: () => set({ user: null, isAuthenticated: false, error: null }),
        }),
        { name: 'AuthStore' }
    )
);
