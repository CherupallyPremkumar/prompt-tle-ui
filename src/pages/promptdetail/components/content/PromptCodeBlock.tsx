import React from 'react';

interface PromptCodeBlockProps {
    body: string;
    onCopy: () => void;
}

export const PromptCodeBlock: React.FC<PromptCodeBlockProps> = ({ body, onCopy }) => {
    return (
        <div className="mt-8 rounded-3xl overflow-hidden border border-gray-800 shadow-2xl bg-[#0d1117]">
            <div className="px-6 py-3 border-b border-gray-800 bg-[#161b22] flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <span className="ml-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                        PROMPT_SOURCE.md
                    </span>
                </div>
                <button
                    onClick={onCopy}
                    className="text-[11px] font-bold text-gray-500 hover:text-white transition-colors bg-white/5 px-2 py-1 rounded"
                >
                    COPY
                </button>
            </div>
            <pre className="p-6 sm:p-8 !m-0 overflow-x-auto text-sm leading-relaxed text-blue-100 font-mono scrollbar-none">
                <code>{body}</code>
            </pre>
        </div>
    );
};