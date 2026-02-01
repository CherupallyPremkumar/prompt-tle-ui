import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    label: string;
    value: number | string;
    icon: LucideIcon;
    color: string;
    bg: string;
}

export const StatCard: React.FC<StatCardProps> = ({
                                                      label,
                                                      value,
                                                      icon: Icon,
                                                      color,
                                                      bg,
                                                  }) => {
    return (
        <div className="bg-white border border-gray-100 p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow group">
            <div className={`p-4 ${bg} ${color} rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6" />
            </div>
            <div className="text-3xl font-black text-gray-900 mb-1">
                {value}
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                {label}
            </div>
        </div>
    );
};