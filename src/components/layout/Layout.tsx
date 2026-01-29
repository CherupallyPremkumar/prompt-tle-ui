import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const Layout: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-8">
                    <Outlet />
                </div>
            </main>
            <footer className="py-8 bg-white border-t border-gray-200 mt-auto">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} TokenLimitExceeded. Built for the future of AI.
                </div>
            </footer>
        </div>
    );
};
