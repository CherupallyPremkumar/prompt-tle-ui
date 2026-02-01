import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutContainer, PageCard } from '@/components/layout/Layout/components';
import { PageHeader } from './components/PageHeader';
import { PromptForm } from './components/PromptForm';
import { SidebarGuidance } from './components/SidebarGuidance';
import { usePromptSubmission } from './hooks/usePromptSubmission';

export const AskPrompt: React.FC = () => {
    const navigate = useNavigate();
    const { handleSubmit, isSubmitting, isUploading } = usePromptSubmission();

    const handleDiscard = () => {
        navigate('/');
    };

    return (
        <LayoutContainer>
            {/* Header */}
            <PageHeader />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Form Column */}
                <div className="lg:col-span-8">
                    <PromptForm
                        onSubmit={handleSubmit}
                        onDiscard={handleDiscard}
                        isSubmitting={isSubmitting}
                        isUploading={isUploading}
                    />
                </div>

                {/* Sidebar Column */}
                <div className="lg:col-span-4">
                    <SidebarGuidance />
                </div>
            </div>
        </LayoutContainer>
    );
};