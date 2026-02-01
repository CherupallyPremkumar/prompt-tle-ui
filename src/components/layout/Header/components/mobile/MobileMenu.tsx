import React from 'react';
import { User } from '@/types';
import { MobileMenuBackdrop } from './MobileMenuBackdrop';
import { MobileMenuPanel } from './MobileMenuPanel';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    mobileMenuRef: React.RefObject<HTMLDivElement>;
    isAuthenticated: boolean;
    user: User | null;
    handleLogout: () => void;
    isLoggingOut: boolean;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
                                                          isOpen,
                                                          onClose,
                                                          mobileMenuRef,
                                                          isAuthenticated,
                                                          user,
                                                          handleLogout,
                                                          isLoggingOut,
                                                      }) => {
    if (!isOpen) return null;

    return (
        <>
            <MobileMenuBackdrop onClick={onClose} />
            <MobileMenuPanel
                mobileMenuRef={mobileMenuRef}
                isAuthenticated={isAuthenticated}
                user={user}
                handleLogout={handleLogout}
                isLoggingOut={isLoggingOut}
                onClose={onClose}
            />
        </>
    );
};