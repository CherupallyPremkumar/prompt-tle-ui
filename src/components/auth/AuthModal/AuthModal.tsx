import React, { useState, useEffect } from 'react';
import { Modal } from '../../common/Modal/Modal';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { OAuthButtons } from './OAuthButtons';
import { useAuth } from '../../../hooks/auth/useAuth';
import { useAuthModal } from '../../../hooks/auth/useAuthModal';

export const AuthModal: React.FC = () => {
    const { isOpen, closeAuthModal, pendingAction } = useAuthModal();
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated && pendingAction?.callback) {
            // User authenticated, execute pending action
            pendingAction.callback(true);
            closeAuthModal();
        }
    }, [isAuthenticated, pendingAction, closeAuthModal]);

    const handleClose = () => {
        if (pendingAction?.callback) {
            pendingAction.callback(false);
        }
        closeAuthModal();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <div className="flex flex-col gap-4 text-center">
                <div className="space-y-3">
                    <h2 className="text-3xl font-extrabold tracking-tight gradient-text">
                        {mode === 'login' ? 'Sign in to continue' : 'Create an account'}
                    </h2>
                    {pendingAction && (
                        <p className="text-sm text-muted-foreground">
                            You need to be signed in to <span className="font-semibold text-foreground">{pendingAction.type}</span>
                        </p>
                    )}
                </div>

                <OAuthButtons />

                <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-100" />
                    </div>
                    <div className="relative flex justify-center text-xs font-semibold uppercase tracking-wider">
                        <span className="bg-white/50 px-3 text-gray-400">
                            Or continue with email
                        </span>
                    </div>
                </div>

                {mode === 'login' ? (
                    <LoginForm onSuccess={closeAuthModal} />
                ) : (
                    <SignupForm onSuccess={closeAuthModal} />
                )}

                <div className="text-sm text-muted-foreground">
                    {mode === 'login' ? (
                        <>
                            Don't have an account?{' '}
                            <button
                                type="button"
                                onClick={() => setMode('signup')}
                                className="text-primary hover:underline font-medium"
                            >
                                Sign up
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{' '}
                            <button
                                type="button"
                                onClick={() => setMode('login')}
                                className="text-primary hover:underline font-medium"
                            >
                                Sign in
                            </button>
                        </>
                    )}
                </div>
            </div>
        </Modal>
    );
};
