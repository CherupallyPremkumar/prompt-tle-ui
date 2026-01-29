import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { promptService } from '../services/prompt.service';
import { useVote } from '../hooks/data/useVote';
import { useRequireAuth } from '../hooks/auth/useRequireAuth';
import { formatDistanceToNow } from 'date-fns';
import {
    ArrowBigUp,
    ArrowBigDown,
    Bookmark,
    Share2,
    Clock,
    Eye,
    History,
    CheckCircle2,
    MessageSquare,
    Flag,
    Award,
    LucideIcon,
    Archive,
    ShieldCheck,
    Play,
    ArrowUpCircle,
    AlertCircle,
    BookmarkPlus,
    Ban
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { toast } from 'react-hot-toast';
import { AllowedAction } from '../types/prompt.types';

const ACTION_CONFIG: Record<string, { label: string; icon: LucideIcon; variant: 'primary' | 'outline' | 'ghost' }> = {
    submit: { label: 'Submit for Review', icon: ArrowUpCircle, variant: 'primary' },
    validate: { label: 'Validate', icon: ShieldCheck, variant: 'primary' },
    open: { label: 'Open', icon: Play, variant: 'primary' },
    addBounty: { label: 'Add Bounty', icon: Award, variant: 'outline' },
    rollbackRevision: { label: 'Rollback', icon: History, variant: 'outline' },
    reopen: { label: 'Reopen', icon: Play, variant: 'outline' },
    deprecate: { label: 'Deprecate', icon: Ban, variant: 'outline' },
    flag: { label: 'Flag', icon: Flag, variant: 'outline' },
    close: { label: 'Close', icon: Archive, variant: 'outline' },
    removeFavorite: { label: 'Remove Favorite', icon: Bookmark, variant: 'outline' },
    addFavorite: { label: 'Favorite', icon: BookmarkPlus, variant: 'outline' },
};

export const PromptDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { requireAuth } = useRequireAuth();
    const { upvote, downvote } = useVote(id!);

    const [actionPayload, setActionPayload] = React.useState<any>(null);

    const { data: initialPrompt, isLoading } = useQuery({
        queryKey: ['prompt', id],
        queryFn: () => promptService.getPromptById(id!),
    });

    const prompt = actionPayload?.mutatedEntity || initialPrompt;
    const allowedActions = actionPayload?.allowedActionsAndMetadata || prompt?.allowedActions || [];

    if (isLoading) {
        return (
            <div className="max-w-5xl mx-auto p-4 space-y-8 animate-pulse">
                <div className="h-10 bg-gray-100 rounded-2xl w-3/4" />
                <div className="flex gap-8">
                    <div className="w-16 h-48 bg-gray-100 rounded-2xl" />
                    <div className="flex-1 space-y-6">
                        <div className="h-4 bg-gray-100 rounded w-full" />
                        <div className="h-4 bg-gray-100 rounded w-5/6" />
                        <div className="h-64 bg-gray-100 rounded-2xl" />
                    </div>
                </div>
            </div>
        );
    }

    if (!prompt) return <div className="text-center py-24 glass rounded-3xl m-4">
        <h2 className="text-2xl font-bold text-gray-900">Prompt not found</h2>
        <p className="text-gray-500 mt-2">The prompt you're looking for might have been moved or deleted.</p>
        <Link to="/" className="inline-block mt-6">
            <Button variant="outline">Browse All Prompts</Button>
        </Link>
    </div>;

    const handleAction = async (actionId: string) => {
        requireAuth(actionId, async () => {
            try {
                let result;
                // Complex actions might eventually need modals for payload gathering
                // For now, we call the direct service method if it exists, otherwise use generic transition
                const method = (promptService as any)[actionId];

                if (typeof method === 'function') {
                    // For standard transitions without required complex payload
                    result = await method(id!);
                } else {
                    result = await (promptService as any).transition(id!, actionId);
                }

                if (result) {
                    setActionPayload(result);
                    toast.success(`Action "${actionId}" completed!`);
                }
            } catch (error) {
                console.error(`Action ${actionId} failed:`, error);
                toast.error(`Action "${actionId}" failed.`);
            }
        });
    };

    const handleFavorite = () => handleAction(prompt.favoriteCount > 0 ? 'removeFavorite' : 'addFavorite');

    return (
        <div className="max-w-5xl mx-auto pb-20">
            {/* Header Section */}
            <div className="mb-8 p-6 glass rounded-3xl border border-gray-100 flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {prompt.tags?.map((tag: string) => (
                            <Link key={tag} to={`/tags/${tag}`} className="text-[10px] font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full hover:bg-orange-100 transition-colors">
                                {tag}
                            </Link>
                        ))}
                    </div>
                    <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-[1.15] tracking-tight">
                        {prompt.title}
                    </h1>
                    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-gray-500 font-medium">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-gray-100 rounded-lg"><Clock className="w-4 h-4 text-gray-500" /></div>
                            <span>Asked <span className="text-gray-900">{formatDistanceToNow(new Date(prompt.createdTime))} ago</span></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-gray-100 rounded-lg"><History className="w-4 h-4 text-gray-500" /></div>
                            <span>Active <span className="text-gray-900">{formatDistanceToNow(new Date(prompt.lastModifiedTime))} ago</span></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-gray-100 rounded-lg"><Eye className="w-4 h-4 text-gray-500" /></div>
                            <span>Viewed <span className="text-gray-900">{prompt.viewCount?.toLocaleString() || 0} times</span></span>
                        </div>
                        {prompt.validationScore > 0 && (
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-green-50 rounded-lg"><CheckCircle2 className="w-4 h-4 text-green-500" /></div>
                                <span>Validation Score <span className="text-green-600 font-bold">{prompt.validationScore}</span></span>
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <div className="px-2 py-0.5 bg-gray-900 text-white text-[10px] font-black rounded uppercase tracking-widest leading-none">
                                {prompt.currentState?.stateId || 'DRAFT'}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="shrink-0 flex flex-wrap gap-2 max-w-[400px] justify-end">
                    {allowedActions.length > 0 ? (
                        allowedActions
                            .filter((a: AllowedAction) => !['upvote', 'downvote', 'recordImpression', 'viewPrompt'].includes(a.allowedAction))
                            .map((action: AllowedAction) => {
                                const config = ACTION_CONFIG[action.allowedAction] || {
                                    label: action.allowedAction.replace(/([A-Z])/g, ' $1').trim(),
                                    icon: AlertCircle,
                                    variant: 'outline'
                                };
                                const Icon = config.icon;
                                return (
                                    <Button
                                        key={action.allowedAction}
                                        variant={config.variant}
                                        size="sm"
                                        onClick={() => handleAction(action.allowedAction)}
                                        className="font-bold text-[11px] uppercase tracking-wider flex items-center gap-2 shadow-sm"
                                    >
                                        <Icon className="w-3.5 h-3.5" />
                                        {config.label}
                                    </Button>
                                );
                            })
                    ) : (
                        <>
                            <Button variant="outline" className="hidden sm:flex border-gray-200">Share</Button>
                            <Link to="/ask"><Button className="font-bold">Ask Question</Button></Link>
                        </>
                    )}
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-10">
                {/* Voting & Metadata Container */}
                <div className="flex flex-row md:flex-col items-center gap-6 shrink-0 md:sticky md:top-24 h-fit">
                    <div className="flex flex-col items-center bg-gray-100/50 p-2 rounded-2xl border border-gray-200/50">
                        <button
                            onClick={upvote}
                            className="p-3 hover:bg-white hover:shadow-sm rounded-xl text-gray-400 hover:text-orange-500 transition-all active:scale-90"
                            title="This prompt is useful"
                        >
                            <ArrowBigUp className="w-10 h-10" />
                        </button>
                        <span className="text-3xl font-black text-gray-900 py-1">{prompt.score}</span>
                        <button
                            onClick={downvote}
                            className="p-3 hover:bg-white hover:shadow-sm rounded-xl text-gray-400 hover:text-orange-500 transition-all active:scale-90"
                            title="This prompt is not useful"
                        >
                            <ArrowBigDown className="w-10 h-10" />
                        </button>
                    </div>

                    <div className="flex md:flex-col items-center gap-5">
                        <button
                            onClick={handleFavorite}
                            className={`p-3 rounded-xl transition-all ${prompt.favoriteCount > 0 ? 'text-yellow-500 bg-yellow-50' : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'}`}
                            title={prompt.favoriteCount > 0 ? "Remove from favorites" : "Save to favorites"}
                        >
                            <Bookmark className="w-6 h-6" />
                        </button>
                        <button className="p-3 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all" title="Share link">
                            <Share2 className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => handleAction('flag')}
                            className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            title="Report for moderation"
                        >
                            <Flag className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 min-w-0 space-y-12">
                    {/* Main Post */}
                    <article className="prose prose-orange max-w-none">
                        <div className="text-[17px] text-gray-800 leading-[1.8] whitespace-pre-wrap font-medium">
                            {prompt.description}
                        </div>

                        {prompt.body && (
                            <div className="mt-8 rounded-3xl overflow-hidden border border-gray-800 shadow-2xl bg-[#0d1117]">
                                <div className="px-6 py-3 border-b border-gray-800 bg-[#161b22] flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-1.5">
                                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                        </div>
                                        <span className="ml-2 text-xs font-bold text-gray-500 uppercase tracking-widest">PROMPT_SOURCE.md</span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(prompt.body || '');
                                            toast.success('Copied to clipboard!');
                                        }}
                                        className="text-[11px] font-bold text-gray-500 hover:text-white transition-colors bg-white/5 px-2 py-1 rounded"
                                    >
                                        COPY
                                    </button>
                                </div>
                                <pre className="p-6 sm:p-8 !m-0 overflow-x-auto text-sm leading-relaxed text-blue-100 font-mono scrollbar-none">
                                    <code>{prompt.body}</code>
                                </pre>
                            </div>
                        )}

                        {/* Author Card (Integrated into flow) */}
                        <div className="mt-12 flex justify-end">
                            <div className="bg-orange-50/50 border border-orange-100 rounded-3xl p-5 w-fit min-w-[280px]">
                                <div className="text-[10px] font-black text-orange-600/60 mb-4 uppercase tracking-[0.2em]">
                                    AUTHOR GENIUS
                                </div>
                                <div className="flex items-center gap-4">
                                    {prompt.imageUrl ? (
                                        <img src={prompt.imageUrl} alt="" className="w-12 h-12 rounded-2xl shadow-sm object-cover" />
                                    ) : (
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                            {(prompt.authorUsername || 'A')[0].toUpperCase()}
                                        </div>
                                    )}
                                    <div className="min-w-0">
                                        <Link to={`/users/${prompt.userId}`} className="text-base font-black text-gray-900 hover:text-orange-600 block transition-colors">
                                            {prompt.authorUsername}
                                        </Link>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <Award className="w-3 h-3 text-orange-500" />
                                            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Top Contributor</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Answers Section */}
                    <div className="pt-12 border-t border-gray-100">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                {prompt.answerCount} Expert Insights <MessageSquare className="w-6 h-6 text-gray-300" />
                            </h2>
                            <div className="flex items-center gap-2 text-sm font-bold text-gray-400">
                                SORT BY: <Button variant="ghost" size="sm" className="text-gray-900 !px-2 uppercase">Votes (Highest)</Button>
                            </div>
                        </div>

                        {prompt.answers && prompt.answers.length > 0 ? (
                            <div className="space-y-8">
                                {prompt.answers.map((answer: any) => (
                                    <div key={answer.id} className="group glass p-8 rounded-[2rem] border-gray-100 hover:border-orange-200 transition-all duration-300">
                                        <div className="flex gap-6">
                                            <div className="flex flex-col items-center gap-2 shrink-0">
                                                <button className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-orange-500 transition-all"><ArrowBigUp className="w-8 h-8" /></button>
                                                <span className="text-xl font-black text-gray-900">{answer.score}</span>
                                                <button className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-orange-500 transition-all"><ArrowBigDown className="w-8 h-8" /></button>
                                                {answer.isAccepted && (
                                                    <div className="mt-4 p-2 bg-green-50 rounded-2xl text-green-600" title="Selected as top answer">
                                                        <CheckCircle2 className="w-8 h-8" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-[16px] text-gray-700 leading-relaxed whitespace-pre-wrap font-medium mb-8">
                                                    {answer.body}
                                                </div>
                                                <div className="flex justify-between items-end border-t border-gray-50 pt-6">
                                                    <div className="flex items-center gap-4 text-xs font-bold text-gray-400">
                                                        <button className="hover:text-gray-900 transition-colors">SHARE</button>
                                                        <button className="hover:text-gray-900 transition-colors">EDIT</button>
                                                        <button className="hover:text-gray-900 transition-colors uppercase">Report</button>
                                                    </div>
                                                    <div className="flex items-center gap-3 bg-white/50 p-2 pr-4 rounded-2xl border border-white">
                                                        <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-sm">
                                                            {(answer.authorUsername || 'A')[0].toUpperCase()}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <Link to={`/users/${answer.userId}`} className="text-xs font-black text-gray-900 hover:text-orange-600 block transition-colors">
                                                                {answer.authorUsername}
                                                            </Link>
                                                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Expert Contributor</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 glass rounded-[3rem] border-2 border-dashed border-gray-100">
                                <div className="p-4 bg-orange-50 rounded-full w-fit mx-auto mb-6 text-orange-500">
                                    <MessageSquare className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-2">No answers yet</h3>
                                <p className="text-gray-500 text-lg mb-8 max-w-sm mx-auto">Be the first to provide insights and earn reputation points!</p>
                                <Button className="px-10 h-14 rounded-2xl text-lg font-black shadow-orange-500/20 shadow-xl">Post Your Answer</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
