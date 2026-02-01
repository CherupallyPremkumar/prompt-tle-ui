import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/common/Button';

interface NoAnswersStateProps {
    onAddAnswer: () => void;
}

export const NoAnswersState: React.FC<NoAnswersStateProps> = ({ onAddAnswer }) => {
    return (
        <div className="text-center py-20 glass rounded-[3rem] border-2 border-dashed border-gray-100">
            <div className="p-4 bg-orange-50 rounded-full w-fit mx-auto mb-6 text-orange-500">
                <MessageSquare className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">
                No answers yet
            </h3>
            <p className="text-gray-500 text-lg mb-8 max-w-sm mx-auto">
                Be the first to provide insights and earn reputation points!
            </p>
            <Button
                onClick={onAddAnswer}
                className="px-10 h-14 rounded-2xl text-lg font-black shadow-orange-500/20 shadow-xl"
            >
                Post Your Answer
            </Button>
        </div>
    );
};