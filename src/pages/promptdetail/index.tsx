import React from 'react';
import { useParams } from 'react-router-dom';
import {
    PromptHeader,
    PromptSidebar,
    PromptContent,
    CommentsSection,
    AnswersSection,
    LoadingSkeleton,
    NotFoundState
} from './components';
import { LayoutContainer } from '@/components/layout/Layout/components';
import { usePromptDetail } from './hooks/usePromptDetail';
import { usePromptActions } from './hooks/usePromptActions';

export const PromptDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const {
        prompt,
        isLoading,
        allowedActions,
        refetch,
    } = usePromptDetail(id!);

    const {
        handleAction,
        handleUpvote,
        handleDownvote,
        handleFavorite,
        handleShare,
        handleCopy,
        handleAddComment,
        handleFlag,
        isCommentFormOpen,
        setIsCommentFormOpen,
        commentText,
        setCommentText,
    } = usePromptActions(id!, prompt, refetch);

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    if (!prompt) {
        return <NotFoundState />;
    }

    return (
        <LayoutContainer>
            <div className="max-w-5xl mx-auto pb-20">
                <PromptHeader
                    prompt={prompt}
                    allowedActions={allowedActions}
                    onAction={handleAction}
                    onShare={handleShare}
                />

                <div className="flex flex-col md:flex-row gap-10">
                    <PromptSidebar
                        score={prompt.score}
                        favoriteCount={prompt.favoriteCount}
                        onUpvote={handleUpvote}
                        onDownvote={handleDownvote}
                        onFavorite={handleFavorite}
                        onShare={handleShare}
                        onFlag={handleFlag}
                    />

                    <div className="flex-1 min-w-0 space-y-12">
                        <PromptContent
                            prompt={prompt}
                            onCopy={handleCopy}
                        />

                        {prompt.comments && prompt.comments.length > 0 && (
                            <CommentsSection
                                comments={prompt.comments}
                                commentCount={prompt.commentCount}
                                isFormOpen={isCommentFormOpen}
                                commentText={commentText}
                                onToggleForm={() => setIsCommentFormOpen(!isCommentFormOpen)}
                                onCommentChange={setCommentText}
                                onSubmitComment={handleAddComment}
                                onCancelComment={() => {
                                    setIsCommentFormOpen(false);
                                    setCommentText('');
                                }}
                            />
                        )}

                        <AnswersSection
                            answers={prompt.answers}
                            answerCount={prompt.answerCount}
                            onAddAnswer={() => handleAction('addAnswer', {
                                body: 'Your answer here',
                                authorUsername: 'current-user'
                            })}
                        />
                    </div>
                </div>
            </div>
        </LayoutContainer>
    );
};