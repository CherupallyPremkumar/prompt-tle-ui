import { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { promptService } from '@/services/prompt.service';
import { useRequireAuth } from '@/hooks/auth/useRequireAuth';
import { useVote } from '@/hooks/data/useVote';
import { logger } from '@/utils/logger';

export const usePromptActions = (promptId: string, prompt: any, refetch: () => void) => {
    const { requireAuth } = useRequireAuth();
    const { upvote, downvote } = useVote(promptId);

    const [isCommentFormOpen, setIsCommentFormOpen] = useState(false);
    const [commentText, setCommentText] = useState('');

    // Generic action handler
    const handleAction = useCallback(async (actionId: string, payload?: any) => {
        requireAuth(actionId, async () => {
            try {
                let result;
                const method = (promptService as any)[actionId];

                if (typeof method === 'function') {
                    result = await method(promptId, payload);
                } else {
                    result = await (promptService as any).transition(promptId, actionId, payload);
                }

                if (result) {
                    toast.success('Action completed successfully');
                    refetch();
                }
            } catch (error) {
                logger.error(`Action ${actionId} failed`, error);
                toast.error('Failed to complete action');
            }
        });
    }, [promptId, requireAuth, refetch]);

    // Specific action handlers
    const handleUpvote = useCallback(() => {
        upvote();
    }, [upvote]);

    const handleDownvote = useCallback(() => {
        downvote();
    }, [downvote]);

    const handleFavorite = useCallback(() => {
        const action = prompt?.favoriteCount > 0 ? 'removeFavorite' : 'addFavorite';
        handleAction(action, { userId: 'current-user' });
    }, [prompt?.favoriteCount, handleAction]);

    const handleShare = useCallback(() => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
    }, []);

    const handleCopy = useCallback(() => {
        if (prompt?.body) {
            navigator.clipboard.writeText(prompt.body);
            toast.success('Copied to clipboard!');
        }
    }, [prompt?.body]);

    const handleAddComment = useCallback(async () => {
        if (!commentText.trim()) return;

        await handleAction('addComment', {
            content: commentText,
            authorUsername: 'current-user'
        });

        setCommentText('');
        setIsCommentFormOpen(false);
    }, [commentText, handleAction]);

    const handleFlag = useCallback(() => {
        handleAction('flag', { reason: 'inappropriate' });
    }, [handleAction]);

    return {
        handleAction,
        handleUpvote,
        handleDownvote,
        handleFavorite,
        handleShare,
        handleCopy,
        handleAddComment,
        handleFlag,
        isCommentFormOpen,
        setIsCommentFormOpen,
        commentText,
        setCommentText,
    };
};