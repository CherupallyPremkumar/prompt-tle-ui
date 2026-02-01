import React from 'react';
import { Link } from 'react-router-dom';

interface DropdownMenuItemProps {
    path: string;
    label: string;
    icon: React.ReactNode;
    userId?: string;
    onClick?: () => void;
}

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
                                                                      path,
                                                                      label,
                                                                      icon,
                                                                      userId,
                                                                      onClick,
                                                                  }) => {
    // Replace :id placeholder with actual userId
    const resolvedPath = path.replace(':id', userId || '');

    return (
        <Link
            to={resolvedPath}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={onClick}
            role="menuitem"
        >
            <div className="flex items-center space-x-2">
                {icon}
                <span>{label}</span>
            </div>
        </Link>
    );
};