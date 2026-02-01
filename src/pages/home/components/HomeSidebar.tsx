import React, { useEffect, useState } from 'react';
import {
    Sparkles,
    TrendingUp,
    Award,
    Users,
    Zap,
    MessageSquare,
    ChevronRight
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Link } from 'react-router-dom';
import { StatItemProps, TagStat, CommunityStats } from '@/pages/home/types';
import { tagQueryService } from '@/services/tag.service';
import { statsQueryService } from '@/services/stats.service';
import { websocketService } from '@/services/websocket.service';
import { useWebSocketStats } from '@/hooks/websocket/useWebSocketStats';
import { useWebSocketTags } from '@/hooks/websocket/useWebSocketTags';
import { WS_CONFIG } from '@/config/websocket.config';

interface HomeSidebarProps {
    onAskPrompt: () => void;
    onTagClick?: (tag: string) => void;
}

export const HomeSidebar: React.FC<HomeSidebarProps> = ({ onAskPrompt }) => {
    const [tags, setTags] = useState<TagStat[]>([]);
    const [stats, setStats] = useState<CommunityStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [statsLoading, setStatsLoading] = useState(true);

    // Initial fetch
    useEffect(() => {
        let mounted = true;

        Promise.all([
            tagQueryService.getPopularTags(),
            statsQueryService.getCommunityStats()
        ]).then(([tagsData, statsData]) => {
            if (!mounted) return;
            setTags(tagsData);
            setStats(statsData);
        }).finally(() => {
            if (mounted) {
                setLoading(false);
                setStatsLoading(false);
            }
        });

        return () => {
            mounted = false;
        };
    }, []);

    // WebSocket real-time updates
    useWebSocketStats(setStats);
    useWebSocketTags(setTags);

    // Connect to WebSocket on mount
    useEffect(() => {
        websocketService.connect(WS_CONFIG.URL);
        return () => websocketService.disconnect();
    }, []);

    return (
        <div className="sticky top-24 space-y-6">
            {/* Ask Prompt CTA */}
            <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-xl shadow-orange-500/20 overflow-hidden relative group">
                {/* Background decoration */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />

                <div className="relative">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                        <Sparkles className="w-6 h-6" />
                    </div>

                    <h3 className="text-xl font-black mb-2">
                        Got a Prompt Challenge?
                    </h3>

                    <p className="text-sm text-orange-100 mb-6 leading-relaxed">
                        Share your question with the community and get expert answers in minutes.
                    </p>

                    <Button
                        onClick={onAskPrompt}
                        className="w-full bg-white text-orange-600 hover:bg-orange-50 font-black border-2 border-white/20"
                    >
                        Ask Your Question
                        <Zap className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>

            {/* Stats Widget */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-orange-500" />
                    Community Stats
                </h3>

                <div className="space-y-4">
                    {statsLoading || !stats ? (
                        <span className="text-sm text-gray-400">Loading stats...</span>
                    ) : (
                        <>
                            <StatItem
                                label="Prompts Today"
                                value={stats.promptsToday.toLocaleString()}
                                icon={MessageSquare}
                                color="text-blue-600"
                                bgColor="bg-blue-50"
                            />
                            <StatItem
                                label="Active Users"
                                value={stats.activeUsers.toLocaleString()}
                                icon={Users}
                                color="text-green-600"
                                bgColor="bg-green-50"
                            />
                            <StatItem
                                label="Answers Given"
                                value={stats.answersGiven.toLocaleString()}
                                icon={Award}
                                color="text-purple-600"
                                bgColor="bg-purple-50"
                            />
                        </>
                    )}
                </div>
            </div>

            {/* Top Tags Widget */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-black text-gray-900 mb-4">
                    Popular Tags
                </h3>

                <div className="flex flex-wrap gap-2">
                    {loading ? (
                        <span className="text-sm text-gray-400">Loading tags...</span>
                    ) : tags.length === 0 ? (
                        <span className="text-sm text-gray-400">No tags available</span>
                    ) : (
                        tags.map((tag) => (
                            <Link
                                key={tag.name}
                                to={`/tags/${tag.name}`}
                                className="px-3 py-1.5 bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-700 rounded-lg text-sm font-bold transition-all group"
                            >
                                {tag.name}
                                <span className="ml-1.5 text-xs text-gray-400 group-hover:text-orange-500">
                                    {tag.count}
                                </span>
                            </Link>
                        ))
                    )}
                </div>

                <Link
                    to="/tags"
                    className="mt-4 flex items-center justify-center gap-1 text-sm font-bold text-gray-600 hover:text-orange-600 transition-colors group"
                >
                    View all tags
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* Quick Links */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-black mb-4">Quick Links</h3>

                <div className="space-y-2">
                    <QuickLink to="/about" label="About Us" />
                    <QuickLink to="/guidelines" label="Community Guidelines" />
                    <QuickLink to="/help" label="Help Center" />
                    <QuickLink to="/contact" label="Contact Support" />
                </div>
            </div>
        </div>
    );
};

// Memoize to prevent re-renders when parent updates
export const MemoizedHomeSidebar = React.memo(HomeSidebar);

// Stat Item Component


const StatItem: React.FC<StatItemProps> = ({ label, value, icon: Icon, color, bgColor }) => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <span className="text-sm font-medium text-gray-600">{label}</span>
            </div>
            <span className="text-lg font-black text-gray-900">{value}</span>
        </div>
    );
};

// Quick Link Component
interface QuickLinkProps {
    to: string;
    label: string;
}

const QuickLink: React.FC<QuickLinkProps> = ({ to, label }) => {
    return (
        <Link
            to={to}
            className="block px-3 py-2 rounded-lg hover:bg-white/10 transition-all text-sm font-medium text-gray-300 hover:text-white group"
        >
            <ChevronRight className="w-4 h-4 inline mr-1 group-hover:translate-x-1 transition-transform" />
            {label}
        </Link>
    );
};

// Popular Tags Data
