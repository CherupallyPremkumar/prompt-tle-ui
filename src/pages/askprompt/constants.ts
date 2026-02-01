import { GuidanceTip } from './types';

export const GUIDANCE_TIPS: GuidanceTip[] = [
    {
        title: 'Be Specific',
        desc: 'Summarize your core challenge in the first sentence.',
    },
    {
        title: 'Show your work',
        desc: "Include what you've tried and what outputs you received.",
    },
    {
        title: 'Structure Data',
        desc: 'Use XML tags or JSON when providing examples to Claude.',
    },
    {
        title: 'Find the right labels',
        desc: 'Add tags that experts in that domain follow.',
    },
];

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

export const FORM_PLACEHOLDERS = {
    title: 'e.g. How to structure prompts for complex code generation in Python?',
    description: "I'm trying to generate a specialized FastAPI endpoint but Claude keeps using...",
    body: 'Paste your prompt template or code here...',
    tags: 'e.g. claude-3, python, system-prompt, coding',
};

export const FORM_LABELS = {
    title: 'Title',
    description: 'Description',
    body: 'Source Content / Examples',
    tags: 'Tags',
    image: 'Thumbnail Image',
};

export const HELP_TEXT = {
    title: "Be specific and imagine you're asking a question to another expert. A good title helps users identify your problem instantly.",
    description: 'Introduce the problem and expand on what you put in the title. Describe what you tried and what you expected to happen.',
    body: 'Include any code snippets, raw prompts, or structured data that helps define your prompt context.',
    tags: 'Add up to 5 tags to describe what your prompt is about. Separate tags with COMMAS.',
    image: 'Add a visual thumbnail for your prompt. Recommended size: 1280x720 (16:9).',
};