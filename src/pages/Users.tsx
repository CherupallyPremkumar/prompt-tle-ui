import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { queryService } from '../services/query.service';
import { User } from '../types';
import { Input } from '../components/common/Input';
import { Search, Award, ExternalLink } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

export const Users: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const { data, isLoading: loading } = useQuery({
        queryKey: ['users', 'all'],
        queryFn: () => queryService.search<User>('user.searchUsers', {}),
    });

    const users = data?.list.map(item => item.row) || [];

    const filteredUsers = users.filter(user =>
        user.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="h-48 bg-gray-100 rounded-2xl" />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="max-w-3xl">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 gradient-text inline-block">Community</h1>
                <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                    Meet the engineers and AI enthusiasts building the future of prompt engineering.
                    Connect with experts and learn from the most active contributors.
                </p>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
                <div className="relative w-full max-w-md group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    <Input
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search contributors..."
                        className="pl-12 !border-none !ring-0 !bg-transparent h-12"
                    />
                </div>
                <div className="flex items-center gap-2 pr-4">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-semibold text-gray-500">
                        {filteredUsers.length} active researchers
                    </span>
                </div>
            </div>

            {/* Users Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredUsers.map((user) => (
                    <Link
                        key={user.id}
                        to={`/users/${user.id}`}
                        className="group bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:border-orange-100 transition-all duration-300"
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="relative mb-4">
                                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 to-red-600 rounded-full blur opacity-0 group-hover:opacity-20 transition-opacity" />
                                {user.pictureUrl ? (
                                    <img
                                        src={user.pictureUrl}
                                        alt={user.fullName || user.username || 'User'}
                                        className="w-20 h-20 rounded-full border-4 border-white shadow-md relative"
                                    />
                                ) : (
                                    <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-2xl border-4 border-white shadow-md relative">
                                        {(user.username || 'U')[0].toUpperCase()}
                                    </div>
                                )}
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors truncate w-full">
                                {user.username}
                            </h3>
                            <p className="text-sm text-gray-500 mb-4 truncate w-full">
                                {user.fullName || 'New Participant'}
                            </p>

                            <div className="grid grid-cols-2 w-full gap-2 border-t border-gray-50 pt-4">
                                <div className="flex flex-col items-center p-2 rounded-xl bg-gray-50 group-hover:bg-orange-50 transition-colors">
                                    <span className="text-sm font-bold text-gray-900 group-hover:text-orange-700">
                                        {(user.reputation as any)?.totalReputation?.toLocaleString() || 0}
                                    </span>
                                    <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold group-hover:text-orange-400">Reputation</span>
                                </div>
                                <div className="flex flex-col items-center p-2 rounded-xl bg-gray-50 group-hover:bg-orange-50 transition-colors">
                                    <span className="text-sm font-bold text-gray-900 group-hover:text-orange-700">12%</span>
                                    <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold group-hover:text-orange-400">Impact</span>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center text-xs font-bold text-gray-400 group-hover:text-orange-600 transition-colors">
                                VIEW PROFILE <ExternalLink className="w-3 h-3 ml-1" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {filteredUsers.length === 0 && (
                <div className="text-center py-24 glass rounded-3xl border-2 border-dashed border-gray-200">
                    < Award className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900">No members found</h3>
                    <p className="text-gray-500 mt-2">Be the first to join this category or try another search.</p>
                </div>
            )}
        </div>
    );
};
