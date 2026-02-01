import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/common/Button';

export const NotFoundState: React.FC = () => {
    return (
        <div className="text-center py-24 glass rounded-3xl m-4">
            <h2 className="text-2xl font-bold text-gray-900">
                Prompt not found
            </h2>
            <p className="text-gray-500 mt-2">
                The prompt you're looking for might have been moved or deleted.
            </p>
            <Link to="/" className="inline-block mt-6">
                <Button variant="outline">Browse All Prompts</Button>
            </Link>
        </div>
    );
};