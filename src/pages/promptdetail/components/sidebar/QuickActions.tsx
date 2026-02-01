import React from 'react';
import { Bookmark, Share2, Flag } from 'lucide-react';

interface QuickActionsProps {
    favoriteCount: number;
    onFavorite: () => void;
    onShare: () => void;
    onFlag: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
                                                              favoriteCount,
                                                              onFavorite,
                                                              onShare,
                                                              onFlag,
                                                          }) => {
    const isFavorited = favoriteCount > 0;

    return (
        <div className="flex md:flex-col items-center gap-5">
            <button
                onClick={onFavorite}
                className={`p-3 rounded-xl transition-all ${
                    isFavorited
                        ? 'text-yellow-500 bg-yellow-50'
                        : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
                }`}
                title={isFavorited ? 'Remove from favorites' : 'Save to favorites'}
                aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
            >
                <Bookmark className="w-6 h-6" />
            </button>

            <button
                onClick={onShare}
                className="p-3 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                title="Share link"
                aria-label="Share prompt"
            >
                <Share2 className="w-6 h-6" />
            </button>

            <button
                onClick={onFlag}
                className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                title="Report for moderation"
                aria-label="Flag prompt"
            >
                <Flag className="w-5 h-5" />
            </button>
        </div>
    );
};