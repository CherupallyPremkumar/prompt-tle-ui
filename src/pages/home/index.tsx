import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
    MemoizedHomeSidebar,
    MemoizedHeroSection,
    PromptSection,
} from './components';
import { LayoutContainer } from '@/components/layout/Layout/components';
import { useRequireAuth } from "@/hooks/auth/useRequireAuth.ts";
import { TagBanner } from "@/pages/home/components/TagBanner.tsx";

export type FilterType = 'hot' | 'newest' | 'unanswered';

export const Home: React.FC = () => {
    const navigate = useNavigate();
    const { tag } = useParams<{ tag: string }>();
    const { requireAuth } = useRequireAuth();

    // Stable callback reference - won't change between renders
    const handleAskPrompt = useCallback(() => {
        requireAuth('createPrompt', () => {
            navigate('/ask');
        });
    }, [requireAuth, navigate]);

    return (
        <>
            {/* Hero Section - Full Width (only show when not filtering by tag) */}
            {/* Memoized - will never re-render after initial mount */}
            {!tag && <MemoizedHeroSection onAskPrompt={handleAskPrompt} />}

            {/* Tag Banner - Show when filtering by tag */}
            {tag && <TagBanner key={tag} tag={tag} />}

            <LayoutContainer className="py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Content - 8 columns */}
                    <div className="lg:col-span-8">
                        {/* PromptSection handles all filter/pagination logic */}
                        {/* Only this section re-renders on filter changes */}
                        <PromptSection tag={tag} onAskPrompt={handleAskPrompt} />
                    </div>

                    {/* Sidebar - 4 columns */}
                    {/* Memoized - fetches tags/stats once, stays mounted */}
                    <div className="lg:col-span-4">
                        <MemoizedHomeSidebar onAskPrompt={handleAskPrompt} />
                    </div>
                </div>
            </LayoutContainer>
        </>
    );
};