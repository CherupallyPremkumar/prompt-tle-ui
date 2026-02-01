import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { User, Prompt } from '@/types';
import {
    ProfileHeader,
    StatsGrid,
    ContentTabs,
    LoadingSkeleton,
    NotFoundState
} from './components';
import { LayoutContainer, PageCard } from '@/components/layout/Layout/components';
import { useProfileData } from './hooks/useProfileData';
import { TabType } from './types';



export const Profile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [activeTab, setActiveTab] = useState<TabType>('prompts');

    const {
        user,
        userPrompts,
        loading,
        totalAnswers,
        totalVotes,
    } = useProfileData(id);

    if (loading) {
        return <LoadingSkeleton />;
    }

    if (!user) {
        return <NotFoundState />;
    }

    return (
        <LayoutContainer>
            <PageCard>
                <div className="max-w-6xl mx-auto space-y-10">
                    <ProfileHeader user={user} />

                    <StatsGrid
                        promptsCount={userPrompts.length}
                        answersCount={totalAnswers}
                        votesCount={totalVotes}
                    />

                    <ContentTabs
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                        userPrompts={userPrompts}
                        totalAnswers={totalAnswers}
                    />
                </div>
            </PageCard>
        </LayoutContainer>
    );
};