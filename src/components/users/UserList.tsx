import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { queryService } from '../../services/chenile-query.service';
import type { User } from '../../types';

export const UserList: React.FC = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['users', 'top'],
        queryFn: () => queryService.search<User>('user.searchUsers', {}, 1, 5),
    });

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-3 p-2">
                        <div className="w-10 h-10 bg-gray-100 rounded-full animate-pulse" />
                        <div className="flex-1 space-y-2">
                            <div className="h-3 bg-gray-100 rounded w-24 animate-pulse" />
                            <div className="h-2 bg-gray-50 rounded w-16 animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    const users = data?.list || [];

    return (
        <div className="space-y-4">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-2 mb-4">
                Top Researchers
            </h2>
            <div className="space-y-1">
                {users.map((item) => (
                    <Link
                        key={item.row.id}
                        to={`/users/${item.row.id}`}
                        className="flex items-center space-x-3 p-2 rounded-xl hover:bg-orange-50 group transition-all"
                    >
                        {item.row.pictureUrl ? (
                            <img
                                src={item.row.pictureUrl}
                                alt={item.row.username || 'User'}
                                className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm border-2 border-white shadow-sm">
                                {(item.row.username || 'U')[0].toUpperCase()}
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-900 truncate group-hover:text-orange-700">
                                {item.row.username}
                            </p>
                            <p className="text-xs text-gray-500 font-medium">
                                {(item.row.reputation as any)?.totalReputation || 0} impact
                            </p>
                        </div>
                        <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-orange-400 opacity-0 group-hover:opacity-100 transition-all" />
                    </Link>
                ))}
            </div>
            <Link
                to="/users"
                className="block text-center text-sm font-bold text-orange-600 hover:text-orange-700 pt-2"
            >
                Meet the community
            </Link>
        </div>
    );
};
