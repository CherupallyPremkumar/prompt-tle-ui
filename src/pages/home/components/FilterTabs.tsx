import React from 'react';
import { Flame, Clock, MessageSquare } from 'lucide-react';
import {FilterType} from "@/pages/home";

interface FilterTabsProps {
    activeFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
    totalCount?: number;
}

interface FilterConfig {
    value: FilterType;
    label: string;
    icon: React.ElementType;
    description: string;
}

const FILTERS: FilterConfig[] = [
    {
        value: 'hot',
        label: 'Hot',
        icon: Flame,
        description: 'Trending prompts',
    },
    {
        value: 'newest',
        label: 'Newest',
        icon: Clock,
        description: 'Recently added',
    },
    {
        value: 'unanswered',
        label: 'Unanswered',
        icon: MessageSquare,
        description: 'Needs answers',
    },
];

export const FilterTabs: React.FC<FilterTabsProps> = ({
                                                          activeFilter,
                                                          onFilterChange,
                                                          totalCount = 0,
                                                      }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-2 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-2">
                {FILTERS.map((filter) => {
                    const Icon = filter.icon;
                    const isActive = activeFilter === filter.value;

                    return (
                        <button
                            key={filter.value}
                            onClick={() => onFilterChange(filter.value)}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition-all group relative overflow-hidden ${
                                isActive
                                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
                                    : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                        >
                            {/* Background animation for active state */}
                            {isActive && (
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            )}

                            {/* Content */}
                            <div className="relative flex items-center gap-2">
                                <Icon
                                    className={`w-4 h-4 ${
                                        isActive
                                            ? 'animate-pulse'
                                            : 'group-hover:scale-110 transition-transform'
                                    }`}
                                />
                                <span>{filter.label}</span>

                                {/* Badge for active filter */}
                                {isActive && totalCount > 0 && (
                                    <span className="ml-1 px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-black">
                                        {totalCount}
                                    </span>
                                )}
                            </div>

                            {/* Tooltip on hover */}
                            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                {filter.description}
                                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Results count */}
            {totalCount > 0 && (
                <div className="mt-3 px-2 text-sm text-gray-500 font-medium">
                    Showing {totalCount.toLocaleString()} {totalCount === 1 ? 'prompt' : 'prompts'}
                </div>
            )}
        </div>
    );
};