import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { CommentItem } from './CommentItem';
import { CommentForm } from './CommentForm';

interface CommentsSectionProps {
    comments: any[];
    commentCount: number;
    isFormOpen: boolean;
    commentText: string;
    onToggleForm: () => void;
    onCommentChange: (text: string) => void;
    onSubmitComment: () => void;
    onCancelComment: () => void;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({
                                                                    comments,
                                                                    commentCount,
                                                                    isFormOpen,
                                                                    commentText,
                                                                    onToggleForm,
                                                                    onCommentChange,
                                                                    onSubmitComment,
                                                                    onCancelComment,
                                                                }) => {
    return (
        <div className="pt-8 border-t border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-gray-400" />
                    {commentCount || comments.length} Comments
                </h3>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onToggleForm}
                    className="font-bold text-sm"
                >
                    Add Comment
                </Button>
            </div>

            {isFormOpen && (
                <CommentForm
                    value={commentText}
                    onChange={onCommentChange}
                    onSubmit={onSubmitComment}
                    onCancel={onCancelComment}
                />
            )}

            <div className="space-y-3">
                {comments.map((comment) => (
                    <CommentItem key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    );
};