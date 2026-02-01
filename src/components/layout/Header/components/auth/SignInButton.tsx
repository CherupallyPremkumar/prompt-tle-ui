import React from 'react';
import { useAuthModal } from '@/hooks/auth/useAuthModal';

export const SignInButton: React.FC = () => {
    const { openAuthModal } = useAuthModal();

    return (
        <button
            onClick={() => openAuthModal()}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium transition-all text-sm whitespace-nowrap shadow-sm hover:shadow active:scale-95"
            aria-label="Sign in to your account"
        >
            Sign In
        </button>
    );
};