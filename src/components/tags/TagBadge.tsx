import React from 'react';

interface TagBadgeProps {
    tag: string;
    onClick?: (tag: string) => void;
    className?: string;
}

export const TagBadge: React.FC<TagBadgeProps> = ({ tag, onClick, className = '' }) => {
    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 cursor-pointer hover:bg-blue-200 transition-colors ${className}`}
            onClick={() => onClick && onClick(tag)}
        >
            #{tag}
        </span>
    );
};
