import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AllowedAction } from '@/types/prompt.types';
import { TagList } from './TagList';
import { PromptMetadata } from './PromptMetadata';
import { ActionButtons } from './ActionButtons';
import { Button } from '@/components/common/Button';
import { getActionConfig } from '@/pages/promptdetail/constants/actionConfig';

interface PromptHeaderProps {
    prompt: any;
    allowedActions: AllowedAction[];
    onAction: (actionId: string, payload?: any) => void;
    onShare: () => void;
}

export const PromptHeader: React.FC<PromptHeaderProps> = ({
    prompt,
    allowedActions,
    onAction,
    onShare,
}) => {
    const hasHeaderActions = useMemo(() => {
        return allowedActions.some((a) => {
            const config = getActionConfig(a.allowedAction);
            return config.position === 'header';
        });
    }, [allowedActions]);

    return (
        <div className="mb-8 p-6 glass rounded-3xl border border-gray-100 flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="flex-1 min-w-0">
                {prompt.tags && prompt.tags.length > 0 && (
                    <TagList tags={prompt.tags} />
                )}

                <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-[1.15] tracking-tight">
                    {prompt.title}
                </h1>

                <PromptMetadata prompt={prompt} />
            </div>

            <div className="shrink-0 flex flex-wrap gap-2 max-w-[400px] justify-end">
                {hasHeaderActions ? (
                    <ActionButtons
                        allowedActions={allowedActions}
                        onAction={onAction}
                    />
                ) : (
                    <>
                        <Button
                            variant="outline"
                            onClick={onShare}
                            className="hidden sm:flex border-gray-200"
                        >
                            Share
                        </Button>
                        <Link to="/ask">
                            <Button className="font-bold">Ask Question</Button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};