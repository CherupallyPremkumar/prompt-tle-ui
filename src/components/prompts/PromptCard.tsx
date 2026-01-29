import React from 'react';
import { Link } from 'react-router-dom';
import { useVote } from '../../hooks/data/useVote';
import { Prompt } from '../../types/prompt.types';
import { formatDistanceToNow } from 'date-fns';
import { ArrowBigUp, ArrowBigDown } from 'lucide-react';

interface PromptCardProps {
    prompt: Prompt;
}

export const PromptCard: React.FC<PromptCardProps> = ({ prompt }) => {
    const { upvote, downvote, isLoading } = useVote(prompt.id);

    return (
        <div className="py-6 flex gap-4 sm:gap-6 hover:bg-gray-50/50 transition-all rounded-lg">
            {/* Stats Section */}
            <div className="hidden sm:flex flex-col items-end w-24 shrink-0 space-y-3 pt-1">
                <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">{prompt.score}</div>
                    <div className="text-xs text-gray-500">votes</div>
                </div>
                <div className={`text-right px-2 py-1 rounded border ${prompt.answerCount > 0
                    ? 'border-green-600 bg-green-50 text-green-700 font-medium'
                    : 'border-gray-200 text-gray-500'
                    }`}>
                    <div className="text-sm">{prompt.answerCount}</div>
                    <div className="text-xs">answers</div>
                </div>
                <div className="text-right text-gray-500">
                    <div className="text-sm flex items-center justify-end gap-1">
                        {prompt.viewCount}
                    </div>
                    <div className="text-xs">views</div>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 min-w-0">
                <div className="flex flex-col h-full">
                    <div className="flex gap-4">
                        {prompt.imageUrl && (
                            <div className="shrink-0 w-32 h-20 rounded-lg overflow-hidden border border-gray-100 hidden sm:block">
                                <img
                                    src={prompt.imageUrl}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <Link
                                to={`/prompts/${prompt.id}`}
                                className="text-lg font-semibold text-blue-600 hover:text-blue-700 leading-snug block transition-colors"
                            >
                                {prompt.title}
                            </Link>
                            <p className="mt-2 text-sm text-gray-600 line-clamp-2 leading-relaxed">
                                {prompt.description}
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {prompt.tags.map((tag) => (
                                <Link
                                    key={tag}
                                    to={`/tags/${tag}`}
                                    className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium hover:bg-blue-100 transition-colors"
                                >
                                    {tag}
                                </Link>
                            ))}
                        </div>

                        {/* Author Meta */}
                        <div className="flex items-center gap-2 text-xs text-gray-500 ml-auto">
                            <img
                                src={`https://ui-avatars.com/api/?name=${prompt.authorUsername || 'U'}&background=random`}
                                alt=""
                                className="w-5 h-5 rounded"
                            />
                            <Link to={`/users/${prompt.userId}`} className="text-blue-600 hover:text-blue-700 font-medium">
                                {prompt.authorUsername}
                            </Link>
                            <span>asked {formatDistanceToNow(new Date(prompt.createdTime))} ago</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Vote Controls */}
            <div className="sm:hidden flex flex-col items-center justify-center gap-1 shrink-0 pt-1">
                <button onClick={upvote} disabled={isLoading} className="p-1 hover:bg-orange-50 rounded text-gray-400 hover:text-orange-500">
                    <ArrowBigUp className="w-6 h-6" />
                </button>
                <span className="text-sm font-bold text-gray-700">{prompt.score}</span>
                <button onClick={downvote} disabled={isLoading} className="p-1 hover:bg-orange-50 rounded text-gray-400 hover:text-orange-500">
                    <ArrowBigDown className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};
