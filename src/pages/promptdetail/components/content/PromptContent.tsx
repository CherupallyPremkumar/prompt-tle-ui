import React from 'react';
import { PromptDescription } from './PromptDescription';
import { PromptCodeBlock } from './PromptCodeBlock';
import { AuthorCard } from './AuthorCard';

interface PromptContentProps {
    prompt: any;
    onCopy: () => void;
}

export const PromptContent: React.FC<PromptContentProps> = ({ prompt, onCopy }) => {
    return (
        <article className="prose prose-orange max-w-none">
            <PromptDescription description={prompt.description} />

            {prompt.body && (
                <PromptCodeBlock body={prompt.body} onCopy={onCopy} />
            )}

            <AuthorCard
                username={prompt.authorUsername}
                userId={prompt.userId}
            />
        </article>
    );
};