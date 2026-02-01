import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '@/types';
import { useAuthModal } from '@/hooks/auth/useAuthModal';

interface MobileAuthSectionProps {
    isAuthenticated: boolean;
    user: User | null;
    handleLogout: () => void;
    isLoggingOut: boolean;
    onClose: () => void;
}

export const MobileAuthSection: React.FC<MobileAuthSectionProps> = ({
                                                                        isAuthenticated,
                                                                        user,
                                                                        handleLogout,
                                                                        isLoggingOut,
                                                                        onClose,
                                                                    }) => {
    const { openAuthModal } = useAuthModal();

    if (!isAuthenticated || !user) {
        return (
            <>
                <hr className="my-2 border-gray-100" />
                <button
                    onClick={() => {
                        onClose();
                        openAuthModal();
                    }}
                    className="w-full px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium transition-all text-center"
                >
                    Sign In
                </button>
            </>
        );
    }

    return (
        <>
            <hr className="my-2 border-gray-100" />
            <Link
                to={`/users/${user.id}`}
                className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
                My Profile
            </Link>
            <Link
                to="/settings"
                className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
                Settings
            </Link>
            <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full text-left px-4 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
            >
                {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>
        </>
    );
};