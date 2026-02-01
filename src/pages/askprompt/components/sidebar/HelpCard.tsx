import React from 'react';
import { Code2, ChevronRight } from 'lucide-react';

export const HelpCard: React.FC = () => {
    return (
        <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-orange-400" /> Need Help?
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-6">
                If you're stuck on how to structure your question, check out our
                community standards.
            </p>
            <button className="flex items-center text-xs font-bold text-white group">
                READ THE GUIDE{' '}
                <ChevronRight className="ml-1 w-4 h-4 text-orange-400 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
};