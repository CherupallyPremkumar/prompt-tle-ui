import React from 'react';
import { FileText, MessageSquare, Activity, LucideIcon } from 'lucide-react';
import { Prompt } from '@/types';
import { TabType } from '@/pages/profile/types';
import { TabNavigation } from './TabNavigation';
import { PromptsTab } from './tabs/PromptsTab';
import { AnswersTab } from './tabs/AnswersTab';
import { ActivityTab } from './tabs/ActivityTab';

interface ContentTabsProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
    userPrompts: Prompt[];
    totalAnswers: number;
}

export interface TabConfig {
    id: TabType;
    label: string;
    count: number | null;
    icon: LucideIcon;
}

export const ContentTabs: React.FC<ContentTabsProps> = ({
                                                            activeTab,
                                                            onTabChange,
                                                            userPrompts,
                                                            totalAnswers,
                                                        }) => {
    const tabs: TabConfig[] = [
        {
            id: 'prompts',
            label: 'Prompts',
            count: userPrompts.length,
            icon: FileText
        },
        {
            id: 'answers',
            label: 'Answers',
            count: totalAnswers,
            icon: MessageSquare
        },
        {
            id: 'activity',
            label: 'Activity',
            count: null,
            icon: Activity
        },
    ];

    return (
        <div className="bg-white border border-gray-100 rounded-[3rem] overflow-hidden shadow-sm">
        <TabNavigation
            tabs={tabs}
    activeTab={activeTab}
    onTabChange={onTabChange}
    />

    <div className="p-8 sm:p-12">
    {activeTab === 'prompts' && <PromptsTab prompts={userPrompts} />}
    {activeTab === 'answers' && <AnswersTab />}
    {activeTab === 'activity' && <ActivityTab />}
    </div>
    </div>
);
};