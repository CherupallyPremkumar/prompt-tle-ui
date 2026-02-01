import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MessageSquare, ChevronRight } from 'lucide-react';
import { Prompt } from '@/types';

interface PromptListItemProps {
    prompt: Prompt;
}

export const PromptListItem: React.FC<PromptListItemProps> = ({ prompt }) => {
    return (
        <Link
            to={`/prompts/${prompt.id}`}
            className="group block p-6 rounded-3xl hover:bg-orange-50 transition-colors border-b border-gray-50 last:border-0"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <h3 className="text-xl font-black text-gray-900 group-hover:text-orange-600 transition-colors mb-2">
                        {prompt.title}
                    </h3>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {prompt.tags.map(tag => (
                            <span
                                key={tag}
                                className="text-[10px] font-black uppercase tracking-tighter text-gray-400 bg-gray-100 px-2 py-0.5 rounded"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 text-xs font-bold text-gray-400">
                        <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-orange-400" />
                            {prompt.score}
                        </span>
                        <span className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {prompt.answerCount}
                        </span>
                        <span>{prompt.viewCount.toLocaleString()} views</span>
                    </div>
                </div>

                <ChevronRight className="w-6 h-6 text-gray-200 group-hover:text-orange-500 transition-colors shrink-0 mt-1" />
            </div>
        </Link>
    );
};