import React from 'react';
import { AnswerItem } from './AnswerItem';

interface AnswersListProps {
    answers: any[];
}

export const AnswersList: React.FC<AnswersListProps> = ({ answers }) => {
    const handleAnswerUpvote = (answerId: string) => {
        // TODO: Implement upvote logic
    };

    const handleAnswerDownvote = (answerId: string) => {
        // TODO: Implement downvote logic
    };

    return (
        <div className="space-y-8">
            {answers.map((answer) => (
                <AnswerItem
                    key={answer.id}
                    answer={answer}
                    onUpvote={() => handleAnswerUpvote(answer.id)}
                    onDownvote={() => handleAnswerDownvote(answer.id)}
                />
            ))}
        </div>
    );
};