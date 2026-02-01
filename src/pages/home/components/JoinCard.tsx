import React from 'react';

interface JoinCardProps {
    onAskPrompt: () => void;
}

export const JoinCard: React.FC<JoinCardProps> = ({ onAskPrompt }) => {
    return (
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
                Join the Research
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
                Share your best prompts and help the community build more reliable AI systems.
            </p>
            <button
                onClick={onAskPrompt}
                className="w-full py-2 bg-white text-orange-600 rounded-xl font-bold hover:bg-orange-50 transition-colors"
            >
                Start Writing
            </button>
        </div>
    );
};