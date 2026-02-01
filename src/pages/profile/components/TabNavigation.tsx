import React from 'react';
import { TabType } from '@/pages/profile/types';
import { TabConfig } from './ContentTabs';

interface TabNavigationProps {
    tabs: TabConfig[];
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
                                                                tabs,
                                                                activeTab,
                                                                onTabChange,
                                                            }) => {
    return (
        <div className="flex p-2 bg-gray-50/50 border-b border-gray-100">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                        activeTab === tab.id
                            ? 'bg-white text-orange-600 shadow-sm'
                            : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                    {tab.count !== null && (
                        <span className="opacity-40">({tab.count})</span>
                    )}
                </button>
            ))}
        </div>
    );
};