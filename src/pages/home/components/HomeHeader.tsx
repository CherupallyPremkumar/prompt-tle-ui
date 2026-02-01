import React from 'react';

interface HomeHeaderProps {
    tag?: string;
    onAskPrompt: () => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({ tag, onAskPrompt }) => {
    return (
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
                {tag ? `Prompts tagged [${tag}]` : 'Top Prompts'}
            </h1>
            <button
                onClick={onAskPrompt}
                className="px-6 py-2.5 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors shadow-sm"
            >
                Ask Prompt
            </button>
        </div>
    );
};