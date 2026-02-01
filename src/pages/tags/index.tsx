import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { queryService } from '../../services/chenile-query.service';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Search, Hash, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface Tag {
    name: string;
    count: number;
    description?: string;
}

export const Tags: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const { data, isLoading: loading } = useQuery({
        queryKey: ['tags', 'all'],
        queryFn: () => queryService.search<Tag>('prompt.getCategoryAll', {}),
    });

    const tags = data?.list.map(item => item.row) || [];

    const filteredTags = tags.filter(tag =>
        tag.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-pulse">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-40 bg-gray-100 rounded-2xl" />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="max-w-3xl">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 gradient-text inline-block">Tags</h1>
                <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                    Explore keywords and labels that categorize prompt engineering techniques.
                    Using the right tags helps the community discover your prompts and share better answers.
                </p>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-end sm:items-center">
                <div className="relative w-full max-w-md group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    <Input
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Filter by tag name..."
                        className="pl-12"
                    />
                </div>
                <div className="text-sm font-semibold text-gray-500 bg-gray-100 px-4 py-2 rounded-full shadow-sm border border-gray-200">
                    {filteredTags.length} <span className="text-gray-400 font-normal">available tags</span>
                </div>
            </div>

            {/* Tags Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTags.map((tag) => (
                    <Link
                        key={tag.name}
                        to={`/tags/${tag.name}`}
                        className="group bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:border-orange-100 transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <div className="flex flex-col h-full">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 bg-orange-50 text-orange-600 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                    <Hash className="w-5 h-5" />
                                </div>
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{tag.count} prompts</div>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                                {tag.name}
                            </h3>

                            <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed mb-6">
                                {tag.description || `Discover the best prompt engineering practices and examples for ${tag.name}.`}
                            </p>

                            <div className="mt-auto pt-4 border-t border-gray-50 flex items-center text-xs font-bold text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                VIEW DISCUSSIONS <ChevronRight className="w-4 h-4 ml-1" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {filteredTags.length === 0 && (
                <div className="text-center py-24 glass rounded-3xl border-2 border-dashed border-gray-200">
                    <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900">No tags found</h3>
                    <p className="text-gray-500 mt-2">
                        Try refining your search terms or explore our top categories.
                    </p>
                    <Button variant="ghost" className="mt-6 text-orange-600 hover:text-orange-700" onClick={() => setSearchQuery('')}>
                        Clear search
                    </Button>
                </div>
            )}
        </div>
    );
};
