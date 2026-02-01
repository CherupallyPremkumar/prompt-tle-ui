import React from 'react';
import { formatDistanceToNow } from 'date-fns';

interface CommentItemProps {
    comment: {
        id: string;
        content: string;
        author: string;
        createdAt: string;
    };
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
    const initial = comment.author[0].toUpperCase();

    return (
        <div className="flex gap-3 p-4 bg-gray-50/50 rounded-2xl hover:bg-gray-50 transition-colors">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                {initial}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-gray-900">
                        {comment.author}
                    </span>
                    <span className="text-xs text-gray-400">
                        {formatDistanceToNow(new Date(comment.createdAt))} ago
                    </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                    {comment.content}
                </p>
            </div>
        </div>
    );
};