import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from './components/Footer';

export const Layout: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <main className="flex-1 w-full pt-16">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};
