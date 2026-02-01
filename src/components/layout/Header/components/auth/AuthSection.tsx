import React from 'react';
import { User } from '@/types';
import { LoadingState } from './LoadingState';
import { UserMenu } from './UserMenu';
import { SignInButton } from './SignInButton';

interface AuthSectionProps {
    isAuthenticated: boolean;
    user: User | null;
    authLoading: boolean;
    showUserMenu: boolean;
    setShowUserMenu: (show: boolean) => void;
    userMenuRef: React.RefObject<HTMLDivElement>;
    handleLogout: () => void;
    isLoggingOut: boolean;
}

export const AuthSection: React.FC<AuthSectionProps> = ({
                                                            isAuthenticated,
                                                            user,
                                                            authLoading,
                                                            showUserMenu,
                                                            setShowUserMenu,
                                                            userMenuRef,
                                                            handleLogout,
                                                            isLoggingOut,
                                                        }) => {
    if (authLoading) {
        return <LoadingState />;
    }

    if (isAuthenticated && user) {
        return (
            <UserMenu
                user={user}
                showMenu={showUserMenu}
                setShowMenu={setShowUserMenu}
                menuRef={userMenuRef}
                handleLogout={handleLogout}
                isLoggingOut={isLoggingOut}
            />
        );
    }

    return <SignInButton />;
};