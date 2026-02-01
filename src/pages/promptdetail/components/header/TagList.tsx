import React from 'react';
import { Link } from 'react-router-dom';

interface TagListProps {
    tags: string[];
}

export const TagList: React.FC<TagListProps> = ({ tags }) => {
    return (
        <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
                <Link
                    key={tag}
                    to={`/tags/${tag}`}
                    className="text-[10px] font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full hover:bg-orange-100 transition-colors"
                >
                    {tag}
                </Link>
            ))}
        </div>
    );
};