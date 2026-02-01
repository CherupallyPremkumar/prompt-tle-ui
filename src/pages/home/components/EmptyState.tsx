import React from 'react';
import { FileQuestion, AlertCircle, Search, Filter, Tag, Sparkles, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button';

interface EmptyStateProps {
    type?: 'no-prompts' | 'no-tag-results' | 'no-unanswered';
    tag?: string;
    onAskPrompt?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ type = 'no-prompts', tag, onAskPrompt }) => {
    const navigate = useNavigate();

    const handleAskPrompt = () => {
        if (onAskPrompt) {
            onAskPrompt();
        } else {
            navigate('/ask');
        }
    };

    const handleExploreAll = () => {
        navigate('/');
    };

    // Context-aware empty state for tag filtering
    if (type === 'no-tag-results' && tag) {
        return (
            <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-100 to-blue-100 rounded-2xl mb-6">
                    <Tag className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3">
                    No prompts found for "{tag}"
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                    Be the first to ask a question about <span className="font-bold text-orange-600">{tag}</span>!
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button onClick={handleAskPrompt} className="w-full sm:w-auto px-8 h-12 font-black group">
                        <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                        Ask the First Question
                    </Button>
                    <button
                        onClick={handleExploreAll}
                        className="w-full sm:w-auto px-8 h-12 font-bold text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all"
                    >
                        <TrendingUp className="w-4 h-4 inline mr-2" />
                        Explore All Prompts
                    </button>
                </div>
            </div>
        );
    }

    // Context-aware empty state for unanswered filter
    if (type === 'no-unanswered') {
        return (
            <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl mb-6">
                    <Filter className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3">
                    All caught up! 🎉
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                    Great news! All questions have been answered. Check back later for new questions.
                </p>
                <button
                    onClick={handleExploreAll}
                    className="px-8 h-12 font-bold text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all"
                >
                    <TrendingUp className="w-4 h-4 inline mr-2" />
                    View All Prompts
                </button>
            </div>
        );
    }

    // Default empty state
    return (
        <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-100 to-blue-100 rounded-2xl mb-6">
                <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-3">
                No prompts found
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                We couldn't find any prompts matching your criteria. Try adjusting your filters or be the first to ask a question!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button onClick={handleAskPrompt} className="w-full sm:w-auto px-8 h-12 font-black group">
                    <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                    Ask a Prompt
                </Button>
                <button
                    onClick={handleExploreAll}
                    className="w-full sm:w-auto px-8 h-12 font-bold text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all"
                >
                    <TrendingUp className="w-4 h-4 inline mr-2" />
                    Explore All Prompts
                </button>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                    <strong className="text-gray-700">Pro tip:</strong> Start with broad searches and narrow down using tags
                </p>
            </div>
        </div>
    );
};