import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyTabStateProps {
    icon: LucideIcon;
    message: string;
    subtitle?: string;
}

export const EmptyTabState: React.FC<EmptyTabStateProps> = ({
                                                                icon: Icon,
                                                                message,
                                                                subtitle,
                                                            }) => {
    return (
        <div className="text-center py-20">
            <Icon className="w-12 h-12 text-gray-100 mx-auto mb-4" />
            <p className="text-gray-400 font-bold uppercase tracking-widest">
                {message}
            </p>
            {subtitle && (
                <p className="text-sm text-gray-300 mt-2 font-medium italic">
                    {subtitle}
                </p>
            )}
        </div>
    );
};