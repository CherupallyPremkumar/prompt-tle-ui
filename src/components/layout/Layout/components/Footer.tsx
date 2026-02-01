import React from 'react';

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-8 bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
                &copy; {currentYear} TokenLimitExceeded. Built for the future of AI.
            </div>
        </footer>
    );
};
