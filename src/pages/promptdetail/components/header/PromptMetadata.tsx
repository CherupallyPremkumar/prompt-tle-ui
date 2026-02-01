import React from 'react';
import { Clock, History, Eye, CheckCircle2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { MetadataItem } from './MetadataItem';

interface PromptMetadataProps {
    prompt: any;
}

export const PromptMetadata: React.FC<PromptMetadataProps> = ({ prompt }) => {
    return (
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-gray-500 font-medium">
            <MetadataItem
                icon={Clock}
                label="Asked"
                value={
                    prompt.createdTime
                        ? `${formatDistanceToNow(new Date(prompt.createdTime))} ago`
                        : 'Recently'
                }
            />
            <MetadataItem
                icon={History}
                label="Active"
                value={
                    prompt.lastModifiedTime
                        ? `${formatDistanceToNow(new Date(prompt.lastModifiedTime))} ago`
                        : 'Recently'
                }
            />
            <MetadataItem
                icon={Eye}
                label="Viewed"
                value={`${prompt.viewCount?.toLocaleString() || 0} times`}
            />
            {prompt.validationScore > 0 && (
                <MetadataItem
                    icon={CheckCircle2}
                    label="Validation Score"
                    value={prompt.validationScore}
                    iconBgColor="bg-green-50"
                    iconColor="text-green-500"
                    valueColor="text-green-600"
                />
            )}
            <div className="flex items-center gap-2">
                <div className="px-2 py-0.5 bg-gray-900 text-white text-[10px] font-black rounded uppercase tracking-widest leading-none">
                    {prompt.currentState?.stateId || prompt.stateId || 'DRAFT'}
                </div>
            </div>
        </div>
    );
};