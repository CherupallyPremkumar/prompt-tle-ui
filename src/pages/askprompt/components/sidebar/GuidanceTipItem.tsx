import React from 'react';

interface GuidanceTipItemProps {
    number: number;
    title: string;
    description: string;
}

export const GuidanceTipItem: React.FC<GuidanceTipItemProps> = ({
                                                                    number,
                                                                    title,
                                                                    description,
                                                                }) => {
    return (
        <li className="flex gap-4 group/item">
            <div className="shrink-0 w-6 h-6 rounded-full bg-white flex items-center justify-center text-[10px] font-black border border-gray-100 shadow-sm group-hover/item:bg-orange-500 group-hover/item:text-white group-hover/item:border-orange-500 transition-all">
                {number}
            </div>
            <div>
                <h4 className="text-sm font-bold text-gray-900 mb-1">{title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">
                    {description}
                </p>
            </div>
        </li>
    );
};