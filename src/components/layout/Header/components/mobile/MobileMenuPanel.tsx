import React from 'react';
import { User } from '@/types';
import { MobileNavLinks } from './MobileNavLinks';
import { MobileAuthSection } from './MobileAuthSection';

interface MobileMenuPanelProps {
    mobileMenuRef: React.RefObject<HTMLDivElement>;
    isAuthenticated: boolean;
    user: User | null;
    handleLogout: () => void;
    isLoggingOut: boolean;
    onClose: () => void;
}

export const MobileMenuPanel: React.FC<MobileMenuPanelProps> = ({
                                                                    mobileMenuRef,
                                                                    isAuthenticated,
                                                                    user,
                                                                    handleLogout,
                                                                    isLoggingOut,
                                                                    onClose,
                                                                }) => {
    return (
        <div
            ref={mobileMenuRef}
            className="fixed top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-xl z-40 md:hidden animate-in slide-in-from-top duration-200"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
        >
            <nav className="px-4 py-4 space-y-1">
                <MobileNavLinks />

                <MobileAuthSection
                    isAuthenticated={isAuthenticated}
                    user={user}
                    handleLogout={handleLogout}
                    isLoggingOut={isLoggingOut}
                    onClose={onClose}
                />
            </nav>
        </div>
    );
};