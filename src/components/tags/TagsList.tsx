import React from 'react';
import { Link } from 'react-router-dom';
import { Hash } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { queryService } from '../../services/chenile-query.service';

export const TagsList: React.FC = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['tags', 'list'],
        queryFn: () => queryService.search<any>('prompt.getCategoryAll', {}, 1, 10),
    });

    if (isLoading) {
        return (
            <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-10 bg-gray-100 rounded-lg animate-pulse" />
                ))}
            </div>
        );
    }

    const tags = data?.list || [];

    return (
        <div className="space-y-2">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-2 mb-4">
                Popular Categories
            </h2>
            <div className="grid grid-cols-1 gap-1">
                {tags.map((item) => (
                    <Link
                        key={item.row.name}
                        to={`/tags/${item.row.name}`}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-orange-50 group transition-all"
                    >
                        <div className="flex items-center space-x-3">
                            <div className="p-1.5 bg-gray-100 rounded-md text-gray-500 group-hover:bg-orange-100 group-hover:text-orange-600">
                                <Hash className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-semibold text-gray-700 group-hover:text-orange-700">
                                {item.row.name}
                            </span>
                        </div>
                        <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md group-hover:bg-orange-100 group-hover:text-orange-600">
                            {item.row.count || 0}
                        </span>
                    </Link>
                ))}
            </div>
            <Link
                to="/tags"
                className="block text-center text-sm font-bold text-orange-600 hover:text-orange-700 pt-4"
            >
                View all tags
            </Link>
        </div>
    );
};
