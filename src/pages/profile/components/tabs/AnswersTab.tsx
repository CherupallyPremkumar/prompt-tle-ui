import React from 'react';
import { MessageSquare } from 'lucide-react';
import { EmptyTabState } from './EmptyTabState';

export const AnswersTab: React.FC = () => {
    return (
        <EmptyTabState
            icon={MessageSquare}
            message="Answers ledger is restricted"
            subtitle="Complete 3 peer reviews to unlock full history"
        />
    );
};