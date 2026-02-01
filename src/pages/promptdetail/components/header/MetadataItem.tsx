import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetadataItemProps {
    icon: LucideIcon;
    label: string;
    value: string | number;
    iconBgColor?: string;
    iconColor?: string;
    valueColor?: string;
}

export const MetadataItem: React.FC<MetadataItemProps> = ({
                                                              icon: Icon,
                                                              label,
                                                              value,
                                                              iconBgColor = 'bg-gray-100',
                                                              iconColor = 'text-gray-500',
                                                              valueColor = 'text-gray-900',
                                                          }) => {
    return (
        <div className="flex items-center gap-2">
            <div className={`p-1.5 ${iconBgColor} rounded-lg`}>
                <Icon className={`w-4 h-4 ${iconColor}`} />
            </div>
            <span>
                {label} <span className={`${valueColor} font-semibold`}>{value}</span>
            </span>
        </div>
    );
};