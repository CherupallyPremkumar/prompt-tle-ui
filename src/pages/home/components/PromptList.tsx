import React from 'react';

import { EmptyState } from './EmptyState';
import { Prompt } from '@/types';
import {PromptCard} from "@/components/prompts/PromptCard.tsx";

interface PromptListProps {
    prompts: any[];
}

export const PromptList: React.FC<PromptListProps> = ({ prompts }) => {
    if (prompts.length === 0) {
        return <EmptyState />;
    }

    return (
        <div className="space-y-4">
            {prompts.map((item, index) => (
                <div
                    key={item.row.id}
                    className="animate-in fade-in slide-in-from-bottom-4"
                    style={{
                        animationDelay: `${index * 50}ms`,
                        animationDuration: '500ms',
                        animationFillMode: 'both',
                    }}
                >
                    <PromptCard prompt={item.row as Prompt} />
                </div>
            ))}
        </div>
    );
};