import React from 'react';
import { Sparkles, TrendingUp, Users, Zap } from 'lucide-react';
import { Button } from '@/components/common/Button';

interface HeroSectionProps {
    onAskPrompt: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onAskPrompt }) => {
    return (
        <div className="relative bg-gradient-to-br from-orange-50 via-white to-blue-50 border-b border-gray-200 overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-200 rounded-full opacity-20 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Content */}
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-bold">
                            <Sparkles className="w-4 h-4" />
                            Community-Powered Prompt Engineering
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                            Master Claude with
                            <span className="gradient-text block mt-2">Expert Prompts</span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
                            Join thousands of developers sharing, discovering, and perfecting
                            prompts for Claude AI. Get answers from experts and level up your
                            AI game.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button
                                onClick={onAskPrompt}
                                className="h-14 px-8 text-lg font-black shadow-lg shadow-orange-500/20 group"
                            >
                                Ask a Prompt
                                <Zap className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
                            </Button>

                            <button className="h-14 px-8 text-lg font-bold text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all">
                                Explore Prompts
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <StatCard
                            icon={TrendingUp}
                            value="10K+"
                            label="Prompts Shared"
                            gradient="from-orange-500 to-red-500"
                        />
                        <StatCard
                            icon={Users}
                            value="5K+"
                            label="Active Users"
                            gradient="from-blue-500 to-indigo-500"
                        />
                        <StatCard
                            icon={Sparkles}
                            value="98%"
                            label="Success Rate"
                            gradient="from-purple-500 to-pink-500"
                        />
                        <StatCard
                            icon={Zap}
                            value="24/7"
                            label="Community Support"
                            gradient="from-green-500 to-emerald-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

interface StatCardProps {
    icon: React.ElementType;
    value: string;
    label: string;
    gradient: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, value, label, gradient }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all group">
            <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-black text-gray-900 mb-1">{value}</div>
            <div className="text-sm font-medium text-gray-500">{label}</div>
        </div>
    );
};

// Memoize to prevent re-renders when parent updates
export const MemoizedHeroSection = React.memo(HeroSection);