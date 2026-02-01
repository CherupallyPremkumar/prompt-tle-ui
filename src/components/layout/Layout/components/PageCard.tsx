import React from 'react';

interface PageCardProps {
    children: React.ReactNode;
    className?: string;
}

export const PageCard: React.FC<PageCardProps> = ({
    children,
    className = ''
}) => {
    return (
        <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-8 ${className}`}>
            {children}
        </div>
    );
};
