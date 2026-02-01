import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { promptService } from '@/services/prompt.service';
import { AllowedAction } from '@/types/prompt.types';

export const usePromptDetail = (promptId: string) => {
    const [actionPayload, setActionPayload] = useState<any>(null);

    const { data: initialPrompt, isLoading, refetch } = useQuery({
        queryKey: ['prompt', promptId],
        queryFn: () => promptService.getPromptById(promptId),
    });

    // Use mutated entity if available, otherwise use initial prompt
    const prompt = actionPayload?.mutatedEntity || initialPrompt;

    // Get allowed actions from action payload or prompt
    const allowedActions: AllowedAction[] =
        actionPayload?.allowedActionsAndMetadata ||
        prompt?.allowedActions ||
        [];

    return {
        prompt,
        isLoading,
        allowedActions,
        actionPayload,
        setActionPayload,
        refetch,
    };
};