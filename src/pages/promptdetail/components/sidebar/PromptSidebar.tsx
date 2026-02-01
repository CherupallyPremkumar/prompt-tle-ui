import React from 'react';
import { VoteControls } from './VoteControls';
import { QuickActions } from './QuickActions';

interface PromptSidebarProps {
    score: number;
    favoriteCount: number;
    onUpvote: () => void;
    onDownvote: () => void;
    onFavorite: () => void;
    onShare: () => void;
    onFlag: () => void;
}

export const PromptSidebar: React.FC<PromptSidebarProps> = ({
                                                                score,
                                                                favoriteCount,
                                                                onUpvote,
                                                                onDownvote,
                                                                onFavorite,
                                                                onShare,
                                                                onFlag,
                                                            }) => {
    return (
        <div className="flex flex-row md:flex-col items-center gap-6 shrink-0 md:sticky md:top-24 h-fit">
            <VoteControls
                score={score}
                onUpvote={onUpvote}
                onDownvote={onDownvote}
            />

            <QuickActions
                favoriteCount={favoriteCount}
                onFavorite={onFavorite}
                onShare={onShare}
                onFlag={onFlag}
            />
        </div>
    );
};