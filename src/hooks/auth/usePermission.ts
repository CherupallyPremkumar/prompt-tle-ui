import { useMemo } from 'react';
import { canPerformAction } from '../../config/permissions.config';

/**
 * Hook to check if action is allowed based on allowedActions from API
 */
export const usePermission = (allowedActions?: { allowedAction: string }[]) => {
    const checkPermission = useMemo(() => {
        return (action: string): boolean => {
            // @ts-ignore
            return canPerformAction(action, allowedActions);
        };
    }, [allowedActions]);

    const hasAnyPermission = useMemo(() => {
        return (actions: string[]): boolean => {
            return actions.some(action => checkPermission(action));
        };
    }, [checkPermission]);

    return { checkPermission, hasAnyPermission };
};
