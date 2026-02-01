import React from 'react';
import { Activity } from 'lucide-react';
import { EmptyTabState } from './EmptyTabState';

export const ActivityTab: React.FC = () => {
    return (
        <EmptyTabState
            icon={Activity}
            message="Global Activity Stream"
            subtitle="Available for Level 2 Contributors"
        />
    );
};