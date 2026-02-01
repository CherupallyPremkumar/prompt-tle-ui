import React from 'react';
import { Link } from 'react-router-dom';
import { Award } from 'lucide-react';

interface AuthorCardProps {
    username: string;
    userId: string;
}

export const AuthorCard: React.FC<AuthorCardProps> = ({ username, userId }) => {
    const initial = (username || 'A')[0].toUpperCase();

    return (
        <div className="mt-12 flex justify-end">
            <div className="bg-orange-50/50 border border-orange-100 rounded-3xl p-5 w-fit min-w-[280px]">
                <div className="text-[10px] font-black text-orange-600/60 mb-4 uppercase tracking-[0.2em]">
                    AUTHOR GENIUS
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        {initial}
                    </div>
                    <div className="min-w-0">
                        <Link
                            to={`/users/${userId}`}
                            className="text-base font-black text-gray-900 hover:text-orange-600 block transition-colors"
                        >
                            {username}
                        </Link>
                        <div className="flex items-center gap-2 mt-0.5">
                            <Award className="w-3 h-3 text-orange-500" />
                            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                                Top Contributor
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};