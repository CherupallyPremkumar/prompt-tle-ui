import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowBigUp, ArrowBigDown, CheckCircle2 } from 'lucide-react';

interface AnswerItemProps {
    answer: {
        id: string;
        body: string;
        score: number;
        isAccepted?: boolean;
        authorUsername: string;
        userId: string;
        createdAt?: string;
    };
    onUpvote: () => void;
    onDownvote: () => void;
}

export const AnswerItem: React.FC<AnswerItemProps> = ({
                                                          answer,
                                                          onUpvote,
                                                          onDownvote,
                                                      }) => {
    const authorInitial = (answer.authorUsername || 'A')[0].toUpperCase();

    return (
        <div className="group glass p-8 rounded-[2rem] border-gray-100 hover:border-orange-200 transition-all duration-300">
            <div className="flex gap-6">
                {/* Vote Controls */}
                <div className="flex flex-col items-center gap-2 shrink-0">
                    <button
                        onClick={onUpvote}
                        className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-orange-500 transition-all"
                        aria-label="Upvote answer"
                    >
                        <ArrowBigUp className="w-8 h-8" />
                    </button>
                    <span className="text-xl font-black text-gray-900">
                        {answer.score}
                    </span>
                    <button
                        onClick={onDownvote}
                        className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-orange-500 transition-all"
                        aria-label="Downvote answer"
                    >
                        <ArrowBigDown className="w-8 h-8" />
                    </button>
                    {answer.isAccepted && (
                        <div
                            className="mt-4 p-2 bg-green-50 rounded-2xl text-green-600"
                            title="Selected as top answer"
                        >
                            <CheckCircle2 className="w-8 h-8" />
                        </div>
                    )}
                </div>

                {/* Answer Content */}
                <div className="flex-1 min-w-0">
                    <div className="text-[16px] text-gray-700 leading-relaxed whitespace-pre-wrap font-medium mb-8">
                        {answer.body}
                    </div>

                    {/* Answer Footer */}
                    <div className="flex justify-between items-end border-t border-gray-50 pt-6">
                        <div className="flex items-center gap-4 text-xs font-bold text-gray-400">
                            <button className="hover:text-gray-900 transition-colors">
                                SHARE
                            </button>
                            <button className="hover:text-gray-900 transition-colors">
                                EDIT
                            </button>
                            <button className="hover:text-gray-900 transition-colors">
                                REPORT
                            </button>
                        </div>

                        {/* Author Info */}
                        <div className="flex items-center gap-3 bg-white/50 p-2 pr-4 rounded-2xl border border-white">
                            <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-sm">
                                {authorInitial}
                            </div>
                            <div className="min-w-0">
                                <Link
                                    to={`/users/${answer.userId}`}
                                    className="text-xs font-black text-gray-900 hover:text-orange-600 block transition-colors"
                                >
                                    {answer.authorUsername}
                                </Link>
                                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                                    Expert Contributor
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};