import React, { useState } from 'react';
import { Prompt } from '@/types';
import { MessageSquare, Eye, TrendingUp, CheckCircle2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface PromptPreviewProps {
    prompt: Prompt;
    children: React.ReactNode;
}

export const PromptPreview: React.FC<PromptPreviewProps> = ({ prompt, children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const hasAcceptedAnswer = prompt.answerCount > 0 && prompt.acceptedAnswerId;

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}

            {/* Tooltip Preview */}
            {isVisible && (
                <div
                    className="absolute left-full ml-4 top-0 z-50 w-96 animate-in fade-in slide-in-from-left-2 duration-200"
                    style={{ pointerEvents: 'none' }}
                >
                    {/* Arrow pointing to the upvote button */}
                    <div className="absolute -left-2 top-4 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white drop-shadow-lg" />

                    {/* Preview Card */}
                    <div className="bg-white border-2 border-orange-200 rounded-xl shadow-2xl p-5 space-y-4">
                        {/* Title */}
                        <h4 className="text-lg font-bold text-gray-900 leading-snug line-clamp-2">
                            {prompt.title}
                        </h4>

                        {/* Description */}
                        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                            {prompt.description}
                        </p>

                        {/* Tags */}
                        {prompt.tags && prompt.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                                {prompt.tags.slice(0, 3).map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-bold"
                                    >
                                        {tag}
                                    </span>
                                ))}
                                {prompt.tags.length > 3 && (
                                    <span className="px-2 py-1 bg-gray-50 text-gray-400 rounded-md text-xs font-bold">
                                        +{prompt.tags.length - 3}
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Stats Row */}
                        <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                            {/* Answers */}
                            <div className={`flex items-center gap-1 text-xs font-bold ${hasAcceptedAnswer
                                    ? 'text-green-600'
                                    : prompt.answerCount > 0
                                        ? 'text-blue-600'
                                        : 'text-gray-500'
                                }`}>
                                {hasAcceptedAnswer ? (
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                ) : (
                                    <MessageSquare className="w-3.5 h-3.5" />
                                )}
                                <span>{prompt.answerCount} {prompt.answerCount === 1 ? 'answer' : 'answers'}</span>
                            </div>

                            {/* Views */}
                            <div className="flex items-center gap-1 text-xs font-medium text-gray-500">
                                <Eye className="w-3.5 h-3.5" />
                                <span>{prompt.viewCount.toLocaleString()} views</span>
                            </div>

                            {/* Hot indicator */}
                            {prompt.score > 10 && (
                                <div className="flex items-center gap-1 px-1.5 py-0.5 bg-orange-100 text-orange-600 rounded text-xs font-black">
                                    <TrendingUp className="w-3 h-3" />
                                    HOT
                                </div>
                            )}
                        </div>

                        {/* Author & Time */}
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <img
                                src={prompt.authorUsername
                                    ? `https://ui-avatars.com/api/?name=${prompt.authorUsername}&background=random&size=24`
                                    : `https://ui-avatars.com/api/?name=U&background=random&size=24`
                                }
                                alt={prompt.authorUsername || 'User'}
                                className="w-5 h-5 rounded-md border border-gray-200"
                            />
                            <span className="font-bold text-gray-700">
                                {prompt.authorUsername || 'Anonymous'}
                            </span>
                            <span>•</span>
                            <span>asked {formatDistanceToNow(new Date(prompt.createdTime))} ago</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
