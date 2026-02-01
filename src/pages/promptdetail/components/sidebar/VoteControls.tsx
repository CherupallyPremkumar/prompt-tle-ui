import React from 'react';
import { ArrowBigUp, ArrowBigDown } from 'lucide-react';

interface VoteControlsProps {
    score: number;
    onUpvote: () => void;
    onDownvote: () => void;
}

export const VoteControls: React.FC<VoteControlsProps> = ({
                                                              score,
                                                              onUpvote,
                                                              onDownvote,
                                                          }) => {
    return (
        <div className="flex flex-col items-center bg-gray-100/50 p-2 rounded-2xl border border-gray-200/50">
            <button
                onClick={onUpvote}
                className="p-3 hover:bg-white hover:shadow-sm rounded-xl text-gray-400 hover:text-orange-500 transition-all active:scale-90"
                title="This prompt is useful"
                aria-label="Upvote prompt"
            >
                <ArrowBigUp className="w-10 h-10" />
            </button>

            <span className="text-3xl font-black text-gray-900 py-1">
                {score}
            </span>

            <button
                onClick={onDownvote}
                className="p-3 hover:bg-white hover:shadow-sm rounded-xl text-gray-400 hover:text-orange-500 transition-all active:scale-90"
                title="This prompt is not useful"
                aria-label="Downvote prompt"
            >
                <ArrowBigDown className="w-10 h-10" />
            </button>
        </div>
    );
};