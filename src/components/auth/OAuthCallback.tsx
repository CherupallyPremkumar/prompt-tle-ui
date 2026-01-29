import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/auth/useAuth';
import toast from 'react-hot-toast';

export const OAuthCallback: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { handleOAuthCallback } = useAuth();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        const state = params.get('state');

        if (code) {
            handleOAuthCallback(code, state || undefined)
                .then(() => {
                    toast.success('Successfully signed in!');
                    navigate('/');
                })
                .catch((_error) => {
                    toast.error('Authentication failed');
                    navigate('/');
                });
        }
    }, [location, handleOAuthCallback, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-600 font-medium">Completing authentication...</p>
        </div>
    );
};
