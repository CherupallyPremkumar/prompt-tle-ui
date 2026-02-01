import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/auth/useAuth';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { logger } from '@/utils/logger';

export const OAuthCallback: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { handleOAuthCallback, refreshUser } = useAuth();
    const queryClient = useQueryClient();
    const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');

    useEffect(() => {
        const processOAuthCallback = async () => {
            const params = new URLSearchParams(location.search);
            const code = params.get('code');
            const state = params.get('state');
            const error = params.get('error');

            // console.log('[OAuthCallback] Processing OAuth callback:', { code: !!code, state, error });

            // Check for OAuth errors
            if (error) {
                logger.error('[OAuthCallback] OAuth error', error);
                setStatus('error');
                toast.error(`Authentication failed: ${error}`);
                setTimeout(() => navigate('/'), 2000);
                return;
            }

            // If we have a code (classic OAuth flow)
            if (code) {
                try {
                    // console.log('[OAuthCallback] Processing OAuth code...');
                    await handleOAuthCallback(code, state || undefined);

                    // Force refresh user data
                    await queryClient.invalidateQueries({ queryKey: ['me'] });
                    await refreshUser();

                    setStatus('success');
                    toast.success('Successfully signed in!');

                    // Redirect after a brief moment
                    setTimeout(() => {
                        let returnTo = sessionStorage.getItem('auth_return_to') || '/';
                        sessionStorage.removeItem('auth_return_to');

                        // Prevent infinite redirect loop
                        if (returnTo.includes('/auth/callback') || returnTo.includes('/login')) {
                            returnTo = '/';
                        }

                        navigate(returnTo);
                    }, 1000);
                } catch (error: any) {
                    logger.error('[OAuthCallback] OAuth processing failed', error);
                    setStatus('error');
                    toast.error('Authentication failed. Please try again.');
                    setTimeout(() => navigate('/'), 2000);
                }
            } else {
                // Cookie-based flow (backend already set cookies and redirected)
                // console.log('[OAuthCallback] Cookie-based OAuth flow detected');

                try {
                    // Brief delay to ensure cookies are processed
                    await new Promise(resolve => setTimeout(resolve, 500));

                    // Force refresh user data
                    await queryClient.invalidateQueries({ queryKey: ['me'] });
                    await refreshUser();

                    setStatus('success');
                    toast.success('Completing login...');

                    setTimeout(() => {
                        const returnTo = sessionStorage.getItem('auth_return_to') || '/';
                        sessionStorage.removeItem('auth_return_to');
                        navigate(returnTo);
                    }, 1000);
                } catch (error) {
                    logger.error('[OAuthCallback] Session check failed', error);
                    setStatus('error');
                    toast.error('Authentication failed. Please try again.');
                    setTimeout(() => navigate('/'), 2000);
                }
            }
        };

        processOAuthCallback();
    }, [location, handleOAuthCallback, refreshUser, queryClient, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
            {status === 'processing' && (
                <>
                    <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-600 font-medium">Completing authentication...</p>
                </>
            )}

            {status === 'success' && (
                <>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <p className="text-green-600 font-medium">Authentication successful!</p>
                    <p className="text-sm text-gray-500">Redirecting...</p>
                </>
            )}

            {status === 'error' && (
                <>
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <p className="text-red-600 font-medium">Authentication failed</p>
                    <p className="text-sm text-gray-500">Redirecting back...</p>
                </>
            )}
        </div>
    );
};