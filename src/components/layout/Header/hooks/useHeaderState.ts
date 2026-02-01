import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuth';
import { logger } from '@/utils/logger';

export const useHeaderState = () => {
    const { isAuthenticated, user, logout, isLoading: authLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // State
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    // Refs
    const userMenuRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    // Close menus when route changes
    useEffect(() => {
        setShowUserMenu(false);
        setShowMobileMenu(false);
    }, [location.pathname]);

    // Click outside to close user menu
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setShowUserMenu(false);
            }
        };

        if (showUserMenu) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [showUserMenu]);

    // Click outside to close mobile menu
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
                setShowMobileMenu(false);
            }
        };

        if (showMobileMenu) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [showMobileMenu]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (showMobileMenu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showMobileMenu]);

    // Handlers
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            await logout();
            setShowUserMenu(false);
            navigate('/');
        } catch (error) {
            logger.error('Logout failed', error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    return {
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

        // Location
        location,
    };
};