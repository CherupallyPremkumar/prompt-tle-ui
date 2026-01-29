import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePromptQuery } from '../hooks/data/usePromptQuery';
import { PromptCard } from '../components/prompts/PromptCard';
import { useRequireAuth } from '../hooks/auth/useRequireAuth';
import { TagsList } from '../components/tags/TagsList';
import { UserList } from '../components/users/UserList';

export const Home: React.FC = () => {
    const navigate = useNavigate();
    const { tag } = useParams<{ tag: string }>();
    const [activeFilter, setActiveFilter] = useState<'hot' | 'newest' | 'unanswered'>('hot');
    const { requireAuth } = useRequireAuth();

    // Map filters to API parameters
    const getFilters = () => {
        const filters: any = {};
        if (activeFilter === 'unanswered') {
            filters.answerCount = 0;
        }
        if (tag) {
            filters.tags = [tag];
        }
        return filters;
    };

    // Map local filters to sort criteria
    const getSortCriteria = () => {
        if (activeFilter === 'newest') {
            return [{ name: 'createdTime', ascendingOrder: false }];
        }
        if (activeFilter === 'hot') {
            return [{ name: 'viewCount', ascendingOrder: false }];
        }
        return undefined;
    };

    const { data, isLoading } = usePromptQuery(getFilters(), 1, 20, getSortCriteria(), {
        // Additional options if needed
    });

    const handleAskPrompt = () => {
        requireAuth('createPrompt', () => {
            navigate('/ask');
        });
    };

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-32 bg-gray-100 rounded-lg animate-pulse" />
                    ))}
                </div>
                <div className="hidden lg:block lg:col-span-4 space-y-8">
                    <div className="h-64 bg-gray-100 rounded-xl animate-pulse" />
                    <div className="h-64 bg-gray-100 rounded-xl animate-pulse" />
                </div>
            </div>
        );
    }

    const promptList = data?.list || [];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        {tag ? `Prompts tagged [${tag}]` : 'Top Prompts'}
                    </h1>
                    <button
                        onClick={handleAskPrompt}
                        className="px-6 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-semibold shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                        Ask Prompt
                    </button>
                </div>

                {/* Filters */}
                <div className="flex space-x-2 sm:space-x-4 border-b border-gray-100">
                    {(['hot', 'newest', 'unanswered'] as const).map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`pb-3 px-3 sm:px-4 font-medium capitalize transition-all relative ${activeFilter === filter
                                ? 'text-orange-600'
                                : 'text-gray-500 hover:text-gray-900'
                                }`}
                        >
                            {filter}
                            {activeFilter === filter && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Prompt List */}
                <div className="divide-y divide-gray-100 bg-white rounded-xl">
                    {promptList.map((item) => (
                        <PromptCard key={item.row.id} prompt={item.row} />
                    ))}

                    {promptList.length === 0 && (
                        <div className="text-center py-20 bg-gray-50 rounded-xl">
                            <div className="mb-4 text-gray-400">
                                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <p className="text-lg font-medium text-gray-600">No prompts found</p>
                            <p className="text-sm text-gray-500 mt-1">Be the first to share your knowledge!</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {data && data.maxPages > 1 && (
                    <div className="flex items-center justify-center space-x-2 pt-8">
                        <button className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50">
                            &larr; Previous
                        </button>
                        <span className="text-sm font-medium px-4">
                            Page {data.currentPage} of {data.maxPages}
                        </span>
                        <button className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50">
                            Next &rarr;
                        </button>
                    </div>
                )}
            </div>

            {/* Sidebar */}
            <div className="hidden lg:block lg:col-span-4 space-y-8">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <TagsList />
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <UserList />
                </div>

                {/* Stats Card */}
                <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-lg">
                    <h3 className="font-bold text-lg mb-2">Join the Research</h3>
                    <p className="text-orange-50 text-sm mb-4">
                        Share your best prompts and help the community build more reliable AI systems.
                    </p>
                    <button
                        onClick={() => navigate('/ask')}
                        className="w-full py-2 bg-white text-orange-600 rounded-xl font-bold hover:bg-orange-50 transition-colors"
                    >
                        Start Writing
                    </button>
                </div>
            </div>
        </div>
    );
};
