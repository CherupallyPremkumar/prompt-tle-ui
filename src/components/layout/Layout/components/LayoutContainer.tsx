import React from 'react';

interface LayoutContainerProps {
    children: React.ReactNode;
    className?: string;
}

export const LayoutContainer: React.FC<LayoutContainerProps> = ({
    children,
    className = ''
}) => {
    return (
        <div className={`max-w-7xl mx-auto px-4 py-8 ${className}`}>
            {children}
        </div>
    );
};
