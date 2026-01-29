import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth/useAuth';
import { useAuthModal } from '../../hooks/auth/useAuthModal';
import { AuthModal } from '../auth/AuthModal/AuthModal';

export const Header: React.FC = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const { openAuthModal } = useAuthModal();
    const [showUserMenu, setShowUserMenu] = React.useState(false);

    return (
        <>
            <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                                <span className="text-white font-bold text-lg">T</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900 hidden sm:block">
                                TokenLimitExceeded
                            </span>
                        </Link>

                        {/* Navigation */}
                        <nav className="hidden md:flex items-center space-x-6 mx-8">
                            <Link
                                to="/prompts"
                                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                            >
                                Prompts
                            </Link>
                            <Link
                                to="/tags"
                                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                            >
                                Tags
                            </Link>
                            <Link
                                to="/users"
                                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                            >
                                Users
                            </Link>
                        </nav>

                        {/* Search */}
                        <div className="flex-1 max-w-md mx-4 sm:mx-8">
                            <div className="relative">
                                <input
                                    type="search"
                                    placeholder="Search prompts..."
                                    className="w-full px-4 py-2 bg-gray-100 border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none text-sm"
                                />
                            </div>
                        </div>

                        {/* Auth Section */}
                        <div className="flex items-center space-x-4">
                            {isAuthenticated ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg px-2 py-1 transition-colors"
                                    >
                                        <img
                                            src={user?.pictureUrl || `https://ui-avatars.com/api/?name=${user?.username || 'User'}&background=f97316&color=fff`}
                                            alt={user?.fullName || 'User'}
                                            className="w-8 h-8 rounded-full border border-gray-200"
                                        />
                                        <span className="text-sm font-medium hidden sm:block">
                                            {user?.username || user?.fullName}
                                        </span>
                                    </button>

                                    {showUserMenu && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-10"
                                                onClick={() => setShowUserMenu(false)}
                                            />
                                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-20 animate-in fade-in slide-in-from-top-1">
                                                <Link
                                                    to={`/users/${user?.id}`}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                                    onClick={() => setShowUserMenu(false)}
                                                >
                                                    Profile
                                                </Link>
                                                <Link
                                                    to="/settings"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                                    onClick={() => setShowUserMenu(false)}
                                                >
                                                    Settings
                                                </Link>
                                                <hr className="my-2 border-gray-100" />
                                                <button
                                                    onClick={() => {
                                                        logout();
                                                        setShowUserMenu(false);
                                                    }}
                                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <button
                                    onClick={() => openAuthModal()}
                                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium transition-all text-sm whitespace-nowrap"
                                >
                                    Sign In
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <AuthModal />
        </>
    );
};
