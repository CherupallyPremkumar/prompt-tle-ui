import React from 'react';
import { SearchInput } from './SearchInput';
import { ClearButton } from './ClearButton';

interface SearchBarProps {
    query: string;
    onQueryChange: (query: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    className?: string;
    placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
                                                        query,
                                                        onQueryChange,
                                                        onSubmit,
                                                        className = '',
                                                        placeholder = 'Search prompts... (Ctrl+K)',
                                                    }) => {
    return (
        <form onSubmit={onSubmit} className={className}>
            <div className="relative w-full">
                <SearchInput
                    value={query}
                    onChange={onQueryChange}
                    placeholder={placeholder}
                />
                {query && (
                    <ClearButton onClick={() => onQueryChange('')} />
                )}
            </div>
        </form>
    );
};