import React from 'react';

interface PromptDescriptionProps {
    description: string;
}

export const PromptDescription: React.FC<PromptDescriptionProps> = ({ description }) => {
    return (
        <div className="text-[17px] text-gray-800 leading-[1.8] whitespace-pre-wrap font-medium">
            {description}
        </div>
    );
};