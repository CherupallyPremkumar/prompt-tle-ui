import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { promptService } from '../services/prompt.service';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import {
    AlertCircle,
    Lightbulb,
    CheckCircle2,
    Code2,
    ChevronRight,
    Search,
    X,
    UploadCloud
} from 'lucide-react';
import toast from 'react-hot-toast';
import { uploadService } from '../services/upload.service';
import { useAuth } from '../hooks/auth/useAuth';

const promptSchema = z.object({
    title: z.string().min(15, 'Title must be at least 15 characters').max(200),
    description: z.string().min(30, 'Description must be at least 30 characters'),
    body: z.string().optional(),
    tags: z.string().min(2, 'At least one tag is required'),
});

type PromptFormValues = z.infer<typeof promptSchema>;

export const AskPrompt: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [uploading, setUploading] = React.useState(false);
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<PromptFormValues>({
        resolver: zodResolver(promptSchema),
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error('File size must be less than 5MB');
                return;
            }
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
    };

    const onSubmit = async (data: any) => {
        try {
            let imageUrl: string | undefined;

            if (selectedFile && user) {
                setUploading(true);
                imageUrl = await uploadService.uploadImage(selectedFile, user.id);
                setUploading(false);
            }

            // Split tags string into array for service
            const tagArray = data.tags.split(',').map((t: string) => t.trim()).filter(Boolean);
            const payload = { ...data, tags: tagArray, imageUrl };

            const response = await promptService.createPrompt(payload);

            // Extract promptId
            const promptId = response.id || response.mutatedEntity?.id;

            // Automatically submit the prompt to move it out of DRAFT state (Scenario step 2)
            await promptService.submit(promptId);

            toast.success('Prompt published and submitted successfully!', {
                icon: '🚀',
                style: {
                    borderRadius: '16px',
                    background: '#333',
                    color: '#fff',
                },
            });
            navigate(`/prompts/${promptId}`);
        } catch (error) {
            toast.error('Failed to create prompt. Please check your inputs.', {
                style: {
                    borderRadius: '16px',
                },
            });
        }
    };

    return (
        <div className="max-w-6xl mx-auto pb-20">
            {/* Header */}
            <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4 gradient-text inline-block">
                    Ask a Public Prompt
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                    Share your prompt engineering challenges with the world.
                    The best way to get a great answer is to provide context, clear goals, and examples.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Main Form Space */}
                <div className="lg:col-span-8 space-y-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700 delay-100">

                        {/* Title Section */}
                        <div className="bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
                            <div className="mb-6">
                                <label className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-2">
                                    Title <span className="text-orange-500">*</span>
                                </label>
                                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                                    Be specific and imagine you're asking a question to another expert.
                                    A good title helps users identify your problem instantly.
                                </p>
                                <Input
                                    {...register('title')}
                                    placeholder="e.g. How to structure prompts for complex code generation in Python?"
                                    className={`h-14 text-base rounded-xl ${errors.title ? 'border-red-300 ring-red-100' : ''}`}
                                />
                                {errors.title && (
                                    <div className="mt-3 flex items-center gap-2 text-sm text-red-600 font-medium">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.title.message}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Description Section */}
                        <div className="bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
                            <div className="mb-6">
                                <label className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-2">
                                    Description <span className="text-orange-500">*</span>
                                </label>
                                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                                    Introduce the problem and expand on what you put in the title.
                                    Describe what you tried and what you expected to happen.
                                </p>
                                <textarea
                                    {...register('description')}
                                    className={`w-full h-48 p-4 border rounded-2xl text-base transition-all focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none leading-relaxed ${errors.description ? 'border-red-300' : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    placeholder="I'm trying to generate a specialized FastAPI endpoint but Claude keeps using..."
                                />
                                {errors.description && (
                                    <div className="mt-3 flex items-center gap-2 text-sm text-red-600 font-medium">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.description.message}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Image Upload Section */}
                        <div className="bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
                            <div className="mb-6">
                                <label className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-2">
                                    Thumbnail Image
                                </label>
                                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                                    Add a visual thumbnail for your prompt. Recommended size: 1280x720 (16:9).
                                </p>

                                <div className="relative">
                                    {previewUrl ? (
                                        <div className="relative rounded-2xl overflow-hidden border border-gray-200 group">
                                            <img src={previewUrl} alt="Preview" className="w-full h-64 object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button
                                                    type="button"
                                                    onClick={removeImage}
                                                    className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                                                >
                                                    <X className="w-6 h-6" />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-200 rounded-[2rem] cursor-pointer hover:bg-gray-50 hover:border-orange-300 transition-all group">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <div className="p-4 bg-orange-50 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                                                    <UploadCloud className="w-8 h-8 text-orange-500" />
                                                </div>
                                                <p className="mb-2 text-sm text-gray-700 font-bold">Click to upload thumbnail</p>
                                                <p className="text-xs text-gray-400">PNG, JPG or WebP (MAX. 5MB)</p>
                                            </div>
                                            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                        </label>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Body Section */}
                        <div className="bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <label className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                        Source Content / Examples
                                    </label>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-50 px-2 py-1 rounded">Optional</span>
                                </div>
                                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                                    Include any code snippets, raw prompts, or structured data that helps define your prompt context.
                                </p>
                                <div className="relative">
                                    <Code2 className="absolute right-4 top-4 w-5 h-5 text-gray-300" />
                                    <textarea
                                        {...register('body')}
                                        className="w-full h-64 p-6 border border-gray-200 rounded-3xl text-sm font-mono transition-all focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none hover:border-gray-300 bg-gray-50/50 leading-relaxed"
                                        placeholder="Paste your prompt template or code here..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Tags Section */}
                        <div className="bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
                            <div className="mb-6">
                                <label className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-2">
                                    Tags <span className="text-orange-500">*</span>
                                </label>
                                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                                    Add up to 5 tags to describe what your prompt is about.
                                    Separate tags with <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px] font-bold">COMMAS</kbd>.
                                </p>
                                <div className="relative group">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                    <Input
                                        {...register('tags')}
                                        placeholder="e.g. claude-3, python, system-prompt, coding"
                                        className={`pl-12 h-14 rounded-xl ${errors.tags ? 'border-red-300' : ''}`}
                                    />
                                </div>
                                {errors.tags && (
                                    <div className="mt-3 flex items-center gap-2 text-sm text-red-600 font-medium">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.tags.message}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Submission */}
                        <div className="pt-6 flex flex-col sm:flex-row items-center gap-6">
                            <Button
                                type="submit"
                                className="w-full sm:w-auto h-16 px-12 text-lg font-black shadow-xl shadow-orange-500/20"
                                disabled={isSubmitting}
                            >
                                {isSubmitting || uploading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        {uploading ? 'Uploading Image...' : 'Publishing...'}
                                    </div>
                                ) : 'Publish Prompt'}
                            </Button>
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                className="text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest px-8"
                            >
                                Discard Draft
                            </button>
                        </div>

                    </form>
                </div>

                {/* Sidebar Guidance */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="sticky top-24 space-y-6 animate-in fade-in slide-in-from-right-4 duration-700 delay-300">

                        <div className="glass border-orange-100 rounded-[2.5rem] p-8 overflow-hidden relative group">
                            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-orange-100 rounded-full blur-3xl opacity-50 group-hover:scale-150 transition-transform duration-1000" />
                            <div className="relative">
                                <div className="bg-orange-500 text-white p-3 rounded-2xl w-fit mb-6 shadow-lg shadow-orange-500/20">
                                    <Lightbulb className="w-6 h-6" />
                                </div>
                                <h2 className="text-xl font-black text-gray-900 mb-6 leading-tight">
                                    How to write a <br /><span className="gradient-text">winning prompt</span>
                                </h2>
                                <ul className="space-y-6">
                                    {[
                                        { title: 'Be Specific', desc: 'Summarize your core challenge in the first sentence.' },
                                        { title: 'Show your work', desc: "Include what you've tried and what outputs you received." },
                                        { title: 'Structure Data', desc: 'Use XML tags or JSON when providing examples to Claude.' },
                                        { title: 'Find the right labels', desc: 'Add tags that experts in that domain follow.' }
                                    ].map((tip, i) => (
                                        <li key={i} className="flex gap-4 group/item">
                                            <div className="shrink-0 w-6 h-6 rounded-full bg-white flex items-center justify-center text-[10px] font-black border border-gray-100 shadow-sm group-hover/item:bg-orange-500 group-hover/item:text-white group-hover/item:border-orange-500 transition-all">
                                                {i + 1}
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-gray-900 mb-1">{tip.title}</h4>
                                                <p className="text-xs text-gray-500 leading-relaxed font-medium">{tip.desc}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-8 pt-6 border-t border-orange-100/50">
                                    <div className="flex items-center gap-3 text-xs font-black text-orange-600 uppercase tracking-widest">
                                        <CheckCircle2 className="w-4 h-4" /> Reputation +50 for top answers
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Code2 className="w-5 h-5 text-orange-400" /> Need Help?
                            </h3>
                            <p className="text-xs text-gray-400 leading-relaxed mb-6">
                                If you're stuck on how to structure your question, check out our community standards.
                            </p>
                            <button className="flex items-center text-xs font-bold text-white group">
                                READ THE GUIDE <ChevronRight className="ml-1 w-4 h-4 text-orange-400 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};
