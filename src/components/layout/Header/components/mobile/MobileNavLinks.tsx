import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from "../../constants";
export const MobileNavLinks: React.FC = () => {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    return (
        <>
            {NAV_ITEMS.map((item) => (
                <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-4 py-3 rounded-lg font-medium transition-colors ${isActive(item.path)
                            ? 'bg-orange-50 text-orange-600'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                >
                    {item.label}
                </Link>
            ))}
        </>
    );
};