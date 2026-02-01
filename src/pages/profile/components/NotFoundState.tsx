import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/common/Button';

export const NotFoundState: React.FC = () => {
    return (
        <div className="text-center py-24 glass rounded-[3rem] m-4">
            <h2 className="text-3xl font-black text-gray-900 mb-4">
                Profile Missing
            </h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto font-medium">
                We couldn't find the explorer you're looking for. They might have changed their username.
            </p>
            <Link to="/users">
                <Button variant="outline" className="rounded-2xl px-8 h-12">
                    Search Community
                </Button>
            </Link>
        </div>
    );
};