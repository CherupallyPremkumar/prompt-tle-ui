import React from 'react';
import { Award, Calendar, MapPin } from 'lucide-react';
import { User } from '@/types';

interface UserMetadataProps {
    user: User;
}

export const UserMetadata: React.FC<UserMetadataProps> = ({ user }) => {
    const reputation = (user.reputation as any)?.totalReputation || 0;
    const joinedDate = new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
    });

    const metadata = [
        {
            icon: Award,
            label: `${reputation} Rep`,
            color: 'text-orange-500'
        },
        {
            icon: Calendar,
            label: `Joined ${joinedDate}`,
            color: 'text-gray-300'
        },
        {
            icon: MapPin,
            label: 'Global Nexus',
            color: 'text-gray-300'
        }
    ];

    return (
        <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm font-bold text-gray-500 uppercase tracking-widest">
            {metadata.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                    <span>{item.label}</span>
                </div>
            ))}
        </div>
    );
};