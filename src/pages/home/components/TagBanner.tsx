import React from 'react';
import { Tag, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TagBannerProps {
    tag: string;
}

export const TagBanner: React.FC<TagBannerProps> = ({ tag }) => {
    const navigate = useNavigate();

    const handleClearTag = () => {
        navigate('/');
    };

    return (
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 border-b border-blue-600">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                            <Tag className="w-6 h-6 text-white" />
                        </div>

                        <div>
                            <div className="text-sm font-medium text-blue-100 mb-1">
                                Filtering by tag
                            </div>
                            <h2 className="text-2xl font-black text-white">
                                #{tag}
                            </h2>
                        </div>
                    </div>

                    <button
                        onClick={handleClearTag}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold text-sm rounded-xl transition-all border border-white/20"
                    >
                        <X className="w-4 h-4" />
                        Clear Filter
                    </button>
                </div>
            </div>
        </div>
    );
};