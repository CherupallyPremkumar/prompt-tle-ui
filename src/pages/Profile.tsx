import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockDataService, mockPrompts } from '../mocks/mockData';
import { User, Prompt } from '../types';
import {
    Award,
    Calendar,
    MessageSquare,
    FileText,
    Activity,
    Star,
    TrendingUp,
    ChevronRight,
    MapPin,
    ShieldCheck
} from 'lucide-react';
import { Button } from '../components/common/Button';

export const Profile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [userPrompts, setUserPrompts] = useState<Prompt[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'prompts' | 'answers' | 'activity'>('prompts');

    useEffect(() => {
        if (id) {
            loadUserProfile();
        }
    }, [id]);

    const loadUserProfile = async () => {
        setLoading(true);
        try {
            const userData = await mockDataService.getUserById(id!);
            setUser(userData);

            // Get user's prompts
            const prompts = mockPrompts.filter(p => p.userId === id);
            setUserPrompts(prompts);
        } catch (error) {
            console.error('Error loading user profile:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto p-4 space-y-8 animate-pulse">
                <div className="h-64 bg-gray-100 rounded-[3rem]" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="h-32 bg-gray-100 rounded-3xl" />
                    <div className="h-32 bg-gray-100 rounded-3xl" />
                    <div className="h-32 bg-gray-100 rounded-3xl" />
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="text-center py-24 glass rounded-[3rem] m-4">
                <h2 className="text-3xl font-black text-gray-900 mb-4">Profile Missing</h2>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto font-medium">We couldn't find the explorer you're looking for. They might have changed their username.</p>
                <Link to="/users">
                    <Button variant="outline" className="rounded-2xl px-8 h-12">Search Community</Button>
                </Link>
            </div>
        );
    }

    const totalAnswers = mockPrompts.reduce((sum, p) =>
        sum + p.answers.filter(a => a.userId === id).length, 0
    );

    const totalVotes = userPrompts.reduce((sum, p) => sum + p.score, 0);

    return (
        <div className="max-w-6xl mx-auto pb-20 space-y-10">
            {/* High-Fidelity Header */}
            <div className="relative overflow-hidden glass rounded-[3rem] border-white/50 p-8 sm:p-12 shadow-2xl shadow-orange-500/5">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-red-500/20 rounded-full blur-3xl" />

                <div className="relative flex flex-col md:flex-row items-center md:items-start gap-10">
                    {/* Avatar */}
                    <div className="relative shrink-0 group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 to-red-600 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                        {user.pictureUrl ? (
                            <img
                                src={user.pictureUrl}
                                alt={user.fullName || user.username || 'User'}
                                className="w-40 h-40 rounded-full border-[6px] border-white shadow-xl relative object-cover"
                            />
                        ) : (
                            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-black text-5xl border-[6px] border-white shadow-xl relative">
                                {(user.username || 'U')[0].toUpperCase()}
                            </div>
                        )}
                        <div className="absolute -bottom-2 -right-2 p-3 bg-white rounded-2xl shadow-lg border border-gray-50 text-orange-500">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="flex-1 text-center md:text-left min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-2">
                                    {user.fullName || user.username || 'Anonymous Participant'}
                                </h1>
                                <p className="text-xl font-bold text-orange-600 leading-none">
                                    @{user.username || 'anonymous'}
                                </p>
                            </div>
                            <div className="flex gap-3 justify-center">
                                <Button variant="outline" className="rounded-2xl border-gray-200">Message</Button>
                                <Button className="rounded-2xl px-8 shadow-lg shadow-orange-500/20">Follow</Button>
                            </div>
                        </div>

                        <p className="text-lg text-gray-600 mb-8 max-w-2xl font-medium leading-relaxed">
                            {user.bio || "Crafting unique experiences through prompt engineering and logical design. Passionate about AI-driven creative workflows."}
                        </p>

                        <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm font-bold text-gray-500 uppercase tracking-widest">
                            <div className="flex items-center gap-2">
                                <Award className="w-4 h-4 text-orange-500" />
                                <span>{(user.reputation as any)?.totalReputation || 0} Rep</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-300" />
                                <span>Joined {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-300" />
                                <span>Global Nexus</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats Masonry */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Published Prompts', value: userPrompts.length, icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' },
                    { label: 'Solutions Provided', value: totalAnswers, icon: MessageSquare, color: 'text-green-500', bg: 'bg-green-50' },
                    { label: 'Community Score', value: totalVotes, icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50' },
                    { label: 'Weekly Impact', value: '8.4%', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white border border-gray-100 p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow group">
                        <div className={`p-4 ${stat.bg} ${stat.color} rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div className="text-3xl font-black text-gray-900 mb-1">{stat.value}</div>
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Content Tabs */}
            <div className="bg-white border border-gray-100 rounded-[3rem] overflow-hidden shadow-sm">
                <div className="flex p-2 bg-gray-50/50 border-b border-gray-100">
                    {[
                        { id: 'prompts', label: 'Prompts', count: userPrompts.length, icon: FileText },
                        { id: 'answers', label: 'Answers', count: totalAnswers, icon: MessageSquare },
                        { id: 'activity', label: 'Activity', count: null, icon: Activity },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            //@ts-ignore
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === tab.id
                                ? 'bg-white text-orange-600 shadow-sm'
                                : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label} {tab.count !== null && <span className="opacity-40">({tab.count})</span>}
                        </button>
                    ))}
                </div>

                <div className="p-8 sm:p-12">
                    {activeTab === 'prompts' && (
                        <div className="space-y-6">
                            {userPrompts.length === 0 ? (
                                <div className="text-center py-20">
                                    <FileText className="w-12 h-12 text-gray-100 mx-auto mb-4" />
                                    <p className="text-gray-400 font-bold uppercase tracking-widest">No prompts published yet</p>
                                </div>
                            ) : (
                                userPrompts.map((prompt) => (
                                    <Link
                                        key={prompt.id}
                                        to={`/prompts/${prompt.id}`}
                                        className="group block p-6 rounded-3xl hover:bg-orange-50 transition-colors border-b border-gray-50 last:border-0"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <h3 className="text-xl font-black text-gray-900 group-hover:text-orange-600 transition-colors mb-2">
                                                    {prompt.title}
                                                </h3>
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {prompt.tags.map(tag => (
                                                        <span key={tag} className="text-[10px] font-black uppercase tracking-tighter text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="flex items-center gap-4 text-xs font-bold text-gray-400">
                                                    <span className="flex items-center gap-1"><Star className="w-3 h-3 text-orange-400" /> {prompt.score}</span>
                                                    <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {prompt.answerCount}</span>
                                                    <span>{prompt.viewCount.toLocaleString()} views</span>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-6 h-6 text-gray-200 group-hover:text-orange-500 transition-colors shrink-0 mt-1" />
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    )}

                    {activeTab === 'answers' && (
                        <div className="text-center py-20">
                            <MessageSquare className="w-12 h-12 text-gray-100 mx-auto mb-4" />
                            <p className="text-gray-400 font-bold uppercase tracking-widest">Answers ledger is restricted</p>
                            <p className="text-sm text-gray-300 mt-2 font-medium italic">Complete 3 peer reviews to unlock full history</p>
                        </div>
                    )}

                    {activeTab === 'activity' && (
                        <div className="text-center py-20">
                            <Activity className="w-12 h-12 text-gray-100 mx-auto mb-4" />
                            <p className="text-gray-400 font-bold uppercase tracking-widest">Global Activity Stream</p>
                            <p className="text-sm text-gray-300 mt-2 font-medium italic">Available for Level 2 Contributors</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
