import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useVote } from '@/hooks/data/useVote.ts';
import { Prompt } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { PromptPreview } from './PromptPreview';
import {
    ArrowBigUp,
    ArrowBigDown,
    MessageSquare,
    Eye,
    CheckCircle2,
    TrendingUp,
    ChevronDown,
    Copy,
    Check
} from 'lucide-react';

interface PromptCardProps {
    prompt: Prompt;
}

export const PromptCard: React.FC<PromptCardProps> = ({ prompt }) => {
    const { upvote, downvote, isLoading } = useVote(prompt.id);
    const hasAcceptedAnswer = prompt.answerCount > 0 && prompt.acceptedAnswerId;
    const [isExpanded, setIsExpanded] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        const textToCopy = prompt.body || prompt.description || 'No prompt content available';
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-orange-200 transition-all duration-300 relative">
            {/* Quick Look Toggle Button - Top Right */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-orange-50 text-gray-400 hover:text-orange-600 transition-all z-10"
                aria-label="Quick look"
            >
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </button>

            <div className="flex gap-6">
                {/* Vote Section - Left Side with Hover Preview */}
                <PromptPreview prompt={prompt}>
                    <div className="flex flex-col items-center gap-2 shrink-0">
                        <button
                            onClick={upvote}
                            disabled={isLoading}
                            className="p-2 rounded-xl hover:bg-orange-50 text-gray-400 hover:text-orange-500 transition-all disabled:opacity-50 group/upvote"
                            aria-label="Upvote"
                        >
                            <ArrowBigUp className="w-6 h-6 group-hover/upvote:scale-110 transition-transform" />
                        </button>

                        <div className="text-xl font-black text-gray-900 min-w-[3rem] text-center">
                            {prompt.score}
                        </div>

                        <button
                            onClick={downvote}
                            disabled={isLoading}
                            className="p-2 rounded-xl hover:bg-orange-50 text-gray-400 hover:text-orange-500 transition-all disabled:opacity-50 group/downvote"
                            aria-label="Downvote"
                        >
                            <ArrowBigDown className="w-6 h-6 group-hover/downvote:scale-110 transition-transform" />
                        </button>
                    </div>
                </PromptPreview>

                {/* Content Section */}
                <div className="flex-1 min-w-0 space-y-4">
                    {/* Title and Image */}
                    <div className="flex gap-4">
                        <div className="flex-1 min-w-0">
                            <Link
                                to={`/prompts/${prompt.id}`}
                                className="text-xl font-bold text-gray-900 hover:text-orange-600 leading-snug block transition-colors group-hover:text-orange-600"
                            >
                                {prompt.title}
                            </Link>

                            <p className="mt-2 text-sm text-gray-600 line-clamp-2 leading-relaxed">
                                {prompt.description}
                            </p>
                        </div>

                        {/* Thumbnail Image */}
                        {prompt.imageUrl && (
                            <Link
                                to={`/prompts/${prompt.id}`}
                                className="shrink-0 w-36 h-24 rounded-xl overflow-hidden border-2 border-gray-100 group-hover:border-orange-200 transition-all hidden sm:block"
                            >
                                <img
                                    src={prompt.imageUrl}
                                    alt=""
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </Link>
                        )}
                    </div>

                    {/* Tags */}
                    {prompt.tags && prompt.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {prompt.tags.slice(0, 5).map((tag) => (
                                <Link
                                    key={tag}
                                    to={`/tags/${tag}`}
                                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-bold hover:bg-orange-100 hover:text-orange-700 transition-all"
                                >
                                    {tag}
                                </Link>
                            ))}
                            {prompt.tags.length > 5 && (
                                <span className="px-3 py-1.5 bg-gray-50 text-gray-400 rounded-lg text-xs font-bold">
                                    +{prompt.tags.length - 5} more
                                </span>
                            )}
                        </div>
                    )}

                    {/* Footer - Stats and Author */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-gray-100">
                        {/* Stats */}
                        <div className="flex items-center gap-4">
                            {/* Answer Count */}
                            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-sm transition-all ${hasAcceptedAnswer
                                ? 'bg-green-100 text-green-700 border border-green-200'
                                : prompt.answerCount > 0
                                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                    : 'bg-gray-100 text-gray-500 border border-gray-200'
                                }`}>
                                {hasAcceptedAnswer ? (
                                    <CheckCircle2 className="w-4 h-4" />
                                ) : (
                                    <MessageSquare className="w-4 h-4" />
                                )}
                                <span>{prompt.answerCount}</span>
                                <span className="hidden sm:inline text-xs">
                                    {prompt.answerCount === 1 ? 'answer' : 'answers'}
                                </span>
                            </div>

                            {/* View Count */}
                            <div className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
                                <Eye className="w-4 h-4" />
                                <span>{prompt.viewCount.toLocaleString()}</span>
                                <span className="hidden sm:inline text-xs">views</span>
                            </div>

                            {/* Hot/Trending Indicator */}
                            {prompt.score > 10 && (
                                <div className="flex items-center gap-1.5 px-2 py-1 bg-orange-100 text-orange-600 rounded-lg text-xs font-black">
                                    <TrendingUp className="w-3 h-3" />
                                    HOT
                                </div>
                            )}
                        </div>

                        {/* Author */}
                        <div className="flex items-center gap-2 text-xs">
                            <Link
                                to={`/users/${prompt.userId}`}
                                className="flex items-center gap-2 group/author"
                            >
                                <img
                                    src={prompt.authorUsername
                                        ? `https://ui-avatars.com/api/?name=${prompt.authorUsername}&background=random`
                                        : `https://ui-avatars.com/api/?name=U&background=random`
                                    }
                                    alt={prompt.authorUsername || 'User'}
                                    className="w-6 h-6 rounded-lg border border-gray-200 group-hover/author:border-orange-300 transition-all"
                                />
                                <span className="font-bold text-gray-700 group-hover/author:text-orange-600 transition-colors">
                                    {prompt.authorUsername || 'Anonymous'}
                                </span>
                            </Link>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-500 font-medium">
                                asked {formatDistanceToNow(new Date(prompt.createdTime))} ago
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Look Expandable Panel */}
            {isExpanded && (
                <div className="mt-6 pt-6 border-t-2 border-orange-100 animate-in slide-in-from-top-2 duration-300">
                    <div className="space-y-4">
                        {/* Header with Copy Button */}
                        <div className="flex items-center justify-between gap-4">
                            <h3 className="text-lg font-bold text-gray-900">
                                Prompt
                            </h3>
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold text-sm transition-all shadow-sm hover:shadow-md"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4" />
                                        Copy Prompt
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Prompt Body */}
                        {prompt.body ? (
                            <div className="bg-gray-900 text-gray-100 p-5 rounded-xl font-mono text-sm leading-relaxed whitespace-pre-wrap border-2 border-gray-700 max-h-96 overflow-y-auto">
                                {prompt.body}
                            </div>
                        ) : (
                            <div className="bg-gray-50 text-gray-400 p-5 rounded-xl text-center border-2 border-dashed border-gray-200">
                                No prompt content available
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};