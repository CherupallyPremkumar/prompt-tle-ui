import { useCallback } from 'react';
import { useAuth } from './useAuth';
import { useAuthModal } from './useAuthModal';
import { isProtectedAction } from '../../config/permissions.config';
import type { PendingAction } from '../../types/auth.types';

/**
 * Hook to guard protected actions
 * Opens auth modal if user not authenticated
 */
export const useRequireAuth = () => {
    const { isAuthenticated } = useAuth();
    const { openAuthModal } = useAuthModal();

    /**
     * Execute action only if authenticated, else show modal
     */
    const requireAuth = useCallback(
        <T = any>(
            action: string,
            callback: () => Promise<T> | T,
            onSuccess?: (result: T) => void,
            onCancel?: () => void
        ): void => {
            if (!isProtectedAction(action)) {
                // Public action, execute immediately
                Promise.resolve(callback()).then(onSuccess);
                return;
            }

            if (isAuthenticated) {
                // User authenticated, execute action
                Promise.resolve(callback()).then(onSuccess);
            } else {
                // User not authenticated, show modal
                const pendingAction: PendingAction = {
                    type: action,
                    callback: async (success) => {
                        if (success) {
                            const result = await callback();
                            onSuccess?.(result);
                        } else {
                            onCancel?.();
                        }
                    },
                };

                openAuthModal(pendingAction);
            }
        },
        [isAuthenticated, openAuthModal]
    );

    return { requireAuth, isAuthenticated };
};
