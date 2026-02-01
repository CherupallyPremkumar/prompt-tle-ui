import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
    to: string;
    label: string;
}

export const NavLink: React.FC<NavLinkProps> = ({ to, label }) => {
    const location = useLocation();

    const isActive = location.pathname === to || location.pathname.startsWith(to + '/');

    return (
        <Link
            to={to}
            className={`font-medium transition-colors ${
                isActive
                    ? 'text-orange-600 border-b-2 border-orange-600 pb-0.5'
                    : 'text-gray-700 hover:text-gray-900'
            }`}
        >
            {label}
        </Link>
    );
};