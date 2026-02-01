import React from 'react';
import { Link } from 'react-router-dom';

export const Logo: React.FC = () => {
    return (
        <Link
            to="/"
            className="flex items-center space-x-2 flex-shrink-0"
            aria-label="TokenLimitExceeded Home"
        >
            <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">
                TokenLimitExceeded
            </span>
        </Link>
    );
};