import { useMutation, useQueryClient } from '@tanstack/react-query';
import { promptService } from '../../services/prompt.service';
import { useRequireAuth } from '../auth/useRequireAuth';
import toast from 'react-hot-toast';

export const useVote = (promptId: string) => {
    const queryClient = useQueryClient();
    const { requireAuth } = useRequireAuth();

    const upvoteMutation = useMutation({
        mutationFn: () => promptService.upvote(promptId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['prompts', promptId] });
            toast.success('Upvoted!');
        },
        onError: () => {
            toast.error('Failed to upvote');
        },
    });

    const downvoteMutation = useMutation({
        mutationFn: () => promptService.downvote(promptId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['prompts', promptId] });
            toast.success('Downvoted!');
        },
        onError: () => {
            toast.error('Failed to downvote');
        },
    });

    const removeVoteMutation = useMutation({
        mutationFn: () => promptService.removeVote(promptId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['prompts', promptId] });
        },
    });

    const upvote = () => {
        requireAuth('upvote', () => upvoteMutation.mutate());
    };

    const downvote = () => {
        requireAuth('downvote', () => downvoteMutation.mutate());
    };

    const removeVote = () => {
        requireAuth('removeVote', () => removeVoteMutation.mutate());
    };

    return {
        upvote,
        downvote,
        removeVote,
        isLoading: upvoteMutation.isPending || downvoteMutation.isPending,
    };
};
