import React from "react";

export interface StatItemProps {
    label: string;
    value: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    bgColor: string;
}

export interface TagStat {
    name: string;
    count: number;
}

export interface CommunityStats {
    promptsToday: number;
    activeUsers: number;
    answersGiven: number;
}