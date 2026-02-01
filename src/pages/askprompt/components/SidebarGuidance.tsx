import React from 'react';
import { GuidanceCard } from './Sidebar/GuidanceCard';
import { HelpCard } from './Sidebar/HelpCard';

export const SidebarGuidance: React.FC = () => {
    return (
        <div className="sticky top-24 space-y-6 animate-in fade-in slide-in-from-right-4 duration-700 delay-300">
            <GuidanceCard />
            <HelpCard />
        </div>
    );
};