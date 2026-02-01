import React from 'react';
import {
    Logo,
    DesktopNavigation,
    SearchBar,
    AuthSection,
    MobileMenuButton,
    MobileMenu
} from './components';
import { AuthModal } from '@/pages/auth/AuthModal/AuthModal';
import { useHeaderState } from './hooks/useHeaderState';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

export const Header: React.FC = () => {
    const {
        // Search state
        searchQuery,
        setSearchQuery,
        handleSearch,

        // Menu state
        showUserMenu,
        setShowUserMenu,
        showMobileMenu,
        setShowMobileMenu,

        // Refs
        userMenuRef,
        mobileMenuRef,

        // Auth state
        isAuthenticated,
        user,
        authLoading,

        // Handlers
        handleLogout,
        isLoggingOut,
    } = useHeaderState();

    // Keyboard shortcuts
    useKeyboardShortcuts({
        onEscape: () => {
            setShowUserMenu(false);
            setShowMobileMenu(false);
        },
        onSearchFocus: () => {
            document.getElementById('header-search')?.focus();
        },
    });

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between h-16">
                        <Logo />

                        <DesktopNavigation />

                        <SearchBar
                            query={searchQuery}
                            onQueryChange={setSearchQuery}
                            onSubmit={handleSearch}
                            className="hidden sm:flex flex-1 max-w-lg mx-4"
                        />

                        <div className="flex items-center space-x-4">
                            <AuthSection
                                isAuthenticated={isAuthenticated}
                                user={user}
                                authLoading={authLoading}
                                showUserMenu={showUserMenu}
                                setShowUserMenu={setShowUserMenu}
                                userMenuRef={userMenuRef}
                                handleLogout={handleLogout}
                                isLoggingOut={isLoggingOut}
                            />

                            <MobileMenuButton
                                isOpen={showMobileMenu}
                                onClick={() => setShowMobileMenu(!showMobileMenu)}
                            />
                        </div>
                    </div>

                    {/* Mobile Search Bar */}
                    <SearchBar
                        query={searchQuery}
                        onQueryChange={setSearchQuery}
                        onSubmit={handleSearch}
                        className="sm:hidden pb-3"
                        placeholder="Search prompts..."
                    />
                </div>
            </header>

            <MobileMenu
                isOpen={showMobileMenu}
                onClose={() => setShowMobileMenu(false)}
                mobileMenuRef={mobileMenuRef}
                isAuthenticated={isAuthenticated}
                user={user}
                handleLogout={handleLogout}
                isLoggingOut={isLoggingOut}
            />

            <AuthModal />
        </>
    );
};