import React from 'react';
import { Lightbulb, CheckCircle2 } from 'lucide-react';

import { GUIDANCE_TIPS } from '../../constants';
import {GuidanceTipItem} from "@/pages/askprompt/components";

export const GuidanceCard: React.FC = () => {
    return (
        <div className="glass border-orange-100 rounded-[2.5rem] p-8 overflow-hidden relative group">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-orange-100 rounded-full blur-3xl opacity-50 group-hover:scale-150 transition-transform duration-1000" />

            {/* Content */}
            <div className="relative">
                {/* Icon */}
                <div className="bg-orange-500 text-white p-3 rounded-2xl w-fit mb-6 shadow-lg shadow-orange-500/20">
                    <Lightbulb className="w-6 h-6" />
                </div>

                {/* Title */}
                <h2 className="text-xl font-black text-gray-900 mb-6 leading-tight">
                    How to write a <br />
                    <span className="gradient-text">winning prompt</span>
                </h2>

                {/* Tips List */}
                <ul className="space-y-6">
                    {GUIDANCE_TIPS.map((tip, index) => (
                        <GuidanceTipItem
                            key={index}
                            number={index + 1}
                            title={tip.title}
                            description={tip.desc}
                        />
                    ))}
                </ul>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-orange-100/50">
                    <div className="flex items-center gap-3 text-xs font-black text-orange-600 uppercase tracking-widest">
                        <CheckCircle2 className="w-4 h-4" /> Reputation +50 for top answers
                    </div>
                </div>
            </div>
        </div>
    );
};