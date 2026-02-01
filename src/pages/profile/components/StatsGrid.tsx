import React from 'react';
import { FileText, MessageSquare, Star, TrendingUp, LucideIcon } from 'lucide-react';
import { StatCard } from './StatCard';

interface StatsGridProps {
    promptsCount: number;
    answersCount: number;
    votesCount: number;
}

interface StatConfig {
    label: string;
    value: number | string;
    icon: LucideIcon;
    color: string;
    bg: string;
}

export const StatsGrid: React.FC<StatsGridProps> = ({
                                                        promptsCount,
                                                        answersCount,
                                                        votesCount,
                                                    }) => {
    const stats: StatConfig[] = [
        {
            label: 'Published Prompts',
            value: promptsCount,
            icon: FileText,
            color: 'text-blue-500',
            bg: 'bg-blue-50'
        },
        {
            label: 'Solutions Provided',
            value: answersCount,
            icon: MessageSquare,
            color: 'text-green-500',
            bg: 'bg-green-50'
        },
        {
            label: 'Community Score',
            value: votesCount,
            icon: Star,
            color: 'text-yellow-500',
            bg: 'bg-yellow-50'
        },
        {
            label: 'Weekly Impact',
            value: '8.4%',
            icon: TrendingUp,
            color: 'text-purple-500',
            bg: 'bg-purple-50'
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>
    );
};