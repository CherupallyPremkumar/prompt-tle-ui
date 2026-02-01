import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { AnswersList } from './AnswersList';
import { NoAnswersState } from './NoAnswersState';

interface AnswersSectionProps {
    answers: any[];
    answerCount: number;
    onAddAnswer: () => void;
}

export const AnswersSection: React.FC<AnswersSectionProps> = ({
                                                                  answers,
                                                                  answerCount,
                                                                  onAddAnswer,
                                                              }) => {
    const hasAnswers = answers && answers.length > 0;

    return (
        <div className="pt-12 border-t border-gray-100">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                    {answerCount} Expert Insights
                    <MessageSquare className="w-6 h-6 text-gray-300" />
                </h2>
                <div className="flex items-center gap-2 text-sm font-bold text-gray-400">
                    SORT BY:
                    <Button variant="ghost" size="sm" className="text-gray-900 !px-2 uppercase">
                        Votes (Highest)
                    </Button>
                </div>
            </div>

            {hasAnswers ? (
                <AnswersList answers={answers} />
            ) : (
                <NoAnswersState onAddAnswer={onAddAnswer} />
            )}
        </div>
    );
};