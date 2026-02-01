import React from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { Prompt } from '@/types';
import { PromptListItem } from './PromptListItem';
import { EmptyTabState } from './EmptyTabState';

interface PromptsTabProps {
    prompts: Prompt[];
}

export const PromptsTab: React.FC<PromptsTabProps> = ({ prompts }) => {
    if (prompts.length === 0) {
        return (
            <EmptyTabState
                icon={FileText}
                message="No prompts published yet"
            />
        );
    }

    return (
        <div className="space-y-6">
            {prompts.map((prompt) => (
                <PromptListItem key={prompt.id} prompt={prompt} />
            ))}
        </div>
    );
};