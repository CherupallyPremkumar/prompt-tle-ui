import React from 'react';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
                                                            value,
                                                            onChange,
                                                            placeholder = 'Search prompts...',
                                                        }) => {
    return (
        <input
            id="header-search"
            type="search"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-2 bg-gray-100 border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none text-sm"
            aria-label="Search prompts"
        />
    );
};