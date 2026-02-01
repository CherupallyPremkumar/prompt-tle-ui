
import React from 'react';

export const PageHeader: React.FC = () => {
    return (
        <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4 gradient-text inline-block">
                Ask a Public Prompt
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                Share your prompt engineering challenges with the world.
                The best way to get a great answer is to provide context, clear goals, and examples.
            </p>
        </div>
    );
};