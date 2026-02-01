import React from 'react';
import { AllowedAction } from '@/types/prompt.types';
import { Button } from '@/components/common/Button';
import { getActionConfig } from '@/pages/promptdetail/constants/actionConfig';

interface ActionButtonsProps {
    allowedActions: AllowedAction[];
    onAction: (actionId: string, payload?: any) => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
    allowedActions,
    onAction,
}) => {
    const headerActions = allowedActions.filter((a) => {
        const config = getActionConfig(a.allowedAction);
        return config.position === 'header';
    });

    return (
        <>
            {headerActions.map((action) => {
                const config = getActionConfig(action.allowedAction);
                const Icon = config.icon;

                return (
                    <Button
                        key={action.allowedAction}
                        variant={config.variant}
                        size="sm"
                        onClick={() => onAction(action.allowedAction)}
                        className="font-bold text-[11px] uppercase tracking-wider flex items-center gap-2 shadow-sm"
                    >
                        <Icon className="w-3.5 h-3.5" />
                        {config.label}
                    </Button>
                );
            })}
        </>
    );
};