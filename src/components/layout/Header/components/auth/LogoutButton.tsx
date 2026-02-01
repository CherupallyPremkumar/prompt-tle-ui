import React from 'react';
import { Loader2 } from 'lucide-react';

interface LogoutButtonProps {
    onClick: () => void;
    isLoading: boolean;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onClick, isLoading }) => {
    return (
        <button
            onClick={onClick}
            disabled={isLoading}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            role="menuitem"
        >
            <div className="flex items-center space-x-2">
                {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                )}
                <span>{isLoading ? 'Logging out...' : 'Logout'}</span>
            </div>
        </button>
    );
};