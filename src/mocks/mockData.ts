import { Prompt, Answer, Comment, User, PromptState } from '../types';

// Mock Users
export const mockUsers: User[] = [
    {
        id: 'user1',
        username: 'ai_enthusiast',
        fullName: 'Alex Johnson',
        email: 'alex@example.com',
        pictureUrl: 'https://i.pravatar.cc/150?img=1',
        reputation: { totalReputation: 1247, userId: 'user1', tagReputation: {}, badges: [] },
        createdTime: new Date('2024-01-15').toISOString(),
        lastModifiedTime: new Date('2024-01-15').toISOString(),
        tenant: 'default',
        version: 1,
        provider: 'local',
        providerId: 'local-1',
        status: 'ACTIVE',
        isActive: true,
        emailVerified: true,
        createdAt: new Date('2024-01-15').toISOString(),
        lastLogin: null,
        roles: [],
        bio: 'Prompt addict.',
    } as User,
    {
        id: 'user2',
        username: 'prompt_master',
        fullName: 'Sarah Chen',
        email: 'sarah@example.com',
        pictureUrl: 'https://i.pravatar.cc/150?img=2',
        reputation: { totalReputation: 892, userId: 'user2', tagReputation: {}, badges: [] },
        createdTime: new Date('2024-02-20').toISOString(),
        lastModifiedTime: new Date('2024-02-20').toISOString(),
        tenant: 'default',
        version: 1,
        provider: 'local',
        providerId: 'local-2',
        status: 'ACTIVE',
        isActive: true,
        emailVerified: true,
        createdAt: new Date('2024-02-20').toISOString(),
        lastLogin: null,
        roles: [],
        bio: 'Coding for fun.',
    } as User,
    {
        id: 'user3',
        username: 'claude_wizard',
        fullName: 'Michael Rodriguez',
        email: 'michael@example.com',
        pictureUrl: 'https://i.pravatar.cc/150?img=3',
        reputation: { totalReputation: 2156, userId: 'user3', tagReputation: {}, badges: [] },
        createdTime: new Date('2023-11-10').toISOString(),
        lastModifiedTime: new Date('2023-11-10').toISOString(),
        tenant: 'default',
        version: 1,
        provider: 'local',
        providerId: 'local-3',
        status: 'ACTIVE',
        isActive: true,
        emailVerified: true,
        createdAt: new Date('2023-11-10').toISOString(),
        lastLogin: null,
        roles: [],
        bio: 'Master of LLMs.',
    } as User,
];

// Base fields helper
const baseFields = () => ({
    tenant: 'default',
    version: 1,
    createdBy: 'system',
    lastModifiedBy: 'system',
});

// Mock Comments
const mockComments: Comment[] = [
    {
        id: 'comment1',
        promptId: 'prompt1',
        author: 'user2',
        content: 'Have you tried adding more specific context about your use case? That usually helps.',
        createdTime: new Date('2026-01-28T10:30:00').toISOString(),
        lastModifiedTime: new Date('2026-01-28T10:30:00').toISOString(),
        createdAt: new Date('2026-01-28T10:30:00').toISOString(),
        ...baseFields(),
    } as Comment,
    {
        id: 'comment2',
        promptId: 'prompt1',
        author: 'user3',
        content: 'Great question! I had the same issue last week.',
        createdTime: new Date('2026-01-28T14:20:00').toISOString(),
        lastModifiedTime: new Date('2026-01-28T14:20:00').toISOString(),
        createdAt: new Date('2026-01-28T14:20:00').toISOString(),
        ...baseFields(),
    } as Comment,
];

// Mock Answers
const mockAnswers: Answer[] = [
    {
        id: 'answer1',
        promptId: 'prompt1',
        userId: 'user3',
        authorUsername: 'claude_wizard',
        body: `The key is to structure your prompt with clear sections. Here's what works best:

1. **Context**: Start with background information
2. **Task**: Clearly state what you want
3. **Constraints**: Specify any limitations
4. **Format**: Describe the desired output format
5. **Examples**: Provide 2-3 examples

For instance:
\`\`\`
Context: I'm building a customer service chatbot for an e-commerce site.
Task: Generate empathetic responses to customer complaints.
Constraints: Keep responses under 100 words, maintain professional tone.
Format: JSON with 'response' and 'next_action' fields.
Examples: [...]
\`\`\`

This structure helps Claude understand exactly what you need.`,
        createdTime: new Date('2026-01-28T15:00:00').toISOString(),
        score: 15,
        isAccepted: true,
        comments: [
            {
                id: 'comment3',
                promptId: 'prompt1',
                author: 'user1',
                content: 'This is exactly what I needed! The example format is super helpful.',
                createdTime: new Date('2026-01-28T16:00:00').toISOString(),
                lastModifiedTime: new Date('2026-01-28T16:00:00').toISOString(),
                createdAt: new Date('2026-01-28T16:00:00').toISOString(),
                ...baseFields(),
            } as Comment,
        ],
        commentCount: 1,
        revisionNumber: 1,
        attachments: [],
        ...baseFields(),
        lastModifiedTime: new Date('2026-01-28T15:00:00').toISOString(),
        createdAt: new Date('2026-01-28T15:00:00').toISOString(),
        updatedAt: new Date('2026-01-28T15:00:00').toISOString(),
    },
    {
        id: 'answer2',
        promptId: 'prompt1',
        userId: 'user2',
        authorUsername: 'prompt_master',
        body: `I'd also recommend using XML tags to structure your prompt. Claude handles these really well:

\`\`\`xml
<context>
Your background info here
</context>

<instructions>
What you want Claude to do
</instructions>

<examples>
<example>
  <input>Sample input</input>
  <output>Expected output</output>
</example>
</examples>
\`\`\`

The XML approach makes it easy for Claude to parse different sections.`,
        createdTime: new Date('2026-01-28T17:30:00').toISOString(),
        score: 8,
        isAccepted: false,
        comments: [],
        commentCount: 0,
        revisionNumber: 1,
        attachments: [],
        ...baseFields(),
        lastModifiedTime: new Date('2026-01-28T17:30:00').toISOString(),
        createdAt: new Date('2026-01-28T17:30:00').toISOString(),
        updatedAt: new Date('2026-01-28T17:30:00').toISOString(),
    },
];

// Mock Prompts
export const mockPrompts: Prompt[] = [
    {
        id: 'prompt1',
        title: 'How to structure prompts for better code generation with Claude?',
        description: "I'm trying to get Claude to generate Python code for data processing, but the results are inconsistent. What's the best way to structure my prompts?",
        body: `I've been experimenting with different prompt formats, but I'm not getting reliable results. Here's what I've tried:

"Write Python code to process CSV files"

But the output varies a lot. Sometimes it uses pandas, sometimes csv module, sometimes it adds error handling, sometimes it doesn't.

What's the recommended approach for consistent, high-quality code generation?`,
        tags: ['prompt-engineering', 'code-generation', 'python', 'best-practices'],
        userId: 'user1',
        authorUsername: 'ai_enthusiast',
        createdTime: new Date('2026-01-28T09:00:00').toISOString(),
        lastModifiedTime: new Date('2026-01-28T09:00:00').toISOString(),
        currentState: {
            stateId: 'ANSWERED' as PromptState,
            flowId: 'prompt-flow',
        },
        score: 23,
        viewCount: 342,
        answerCount: 2,
        favoriteCount: 5,
        answers: mockAnswers,
        comments: mockComments,
        acceptedAnswerId: 'answer1',
        ...baseFields(),
        isFeatured: true,
        template: null,
        systemPrompt: null,
        taskType: 'CODE_GEN',
        validationScore: 95,
        revisionNumber: 1,
        usageCount: 10,
        commentCount: 2,
    } as any,
    {
        id: 'prompt2',
        title: 'Best practices for prompt chaining with Claude API?',
        description: 'I want to break down a complex task into multiple Claude API calls. How should I structure the conversation?',
        body: `I have a task that requires:
1. Extract key points from a document
2. Generate questions about each point
3. Create a quiz based on those questions

Should I:
- Make three separate API calls?
- Use one call with multiple steps?
- Chain the outputs somehow?

What's the best approach for this kind of workflow?`,
        tags: ['api', 'prompt-chaining', 'workflow', 'conversation-design'],
        userId: 'user2',
        authorUsername: 'prompt_master',
        createdTime: new Date('2026-01-27T14:30:00').toISOString(),
        lastModifiedTime: new Date('2026-01-27T14:30:00').toISOString(),
        currentState: {
            stateId: 'OPEN' as PromptState,
            flowId: 'prompt-flow',
        },
        score: 18,
        viewCount: 256,
        answerCount: 1,
        favoriteCount: 3,
        answers: [],
        comments: [],
        acceptedAnswerId: null,
        ...baseFields(),
        revisionNumber: 1,
        usageCount: 5,
        commentCount: 0,
    } as any,
    {
        id: 'prompt3',
        title: 'How to get Claude to maintain consistent persona across conversation?',
        description: 'I want Claude to act as a specific character, but it keeps breaking character. How can I maintain consistency?',
        body: null,
        tags: ['persona', 'character-ai', 'conversation', 'consistency'],
        userId: 'user3',
        authorUsername: 'claude_wizard',
        createdTime: new Date('2026-01-26T11:00:00').toISOString(),
        lastModifiedTime: new Date('2026-01-26T11:00:00').toISOString(),
        currentState: {
            stateId: 'VALIDATED' as PromptState,
            flowId: 'prompt-flow',
        },
        score: 31,
        viewCount: 487,
        answerCount: 4,
        favoriteCount: 8,
        answers: [],
        comments: [],
        acceptedAnswerId: null,
        ...baseFields(),
        revisionNumber: 1,
        usageCount: 15,
        commentCount: 0,
    } as any,
    {
        id: 'prompt4',
        title: 'Handling long documents: Should I use document upload or paste content?',
        description: "What's the best way to work with long documents (20+ pages) in Claude?",
        body: null,
        tags: ['documents', 'file-upload', 'performance', 'best-practices'],
        userId: 'user1',
        authorUsername: 'ai_enthusiast',
        createdTime: new Date('2026-01-25T16:20:00').toISOString(),
        lastModifiedTime: new Date('2026-01-25T16:20:00').toISOString(),
        currentState: {
            stateId: 'OPEN' as PromptState,
            flowId: 'prompt-flow',
        },
        score: 12,
        viewCount: 189,
        answerCount: 0,
        favoriteCount: 2,
        answers: [],
        comments: [],
        acceptedAnswerId: null,
        ...baseFields(),
        revisionNumber: 1,
        usageCount: 2,
        commentCount: 0,
    } as any,
    {
        id: 'prompt5',
        title: 'Temperature settings: When to use 0.0 vs 1.0?',
        description: "I'm confused about the temperature parameter. When should I use different values?",
        body: `I've read the docs but I'm still not clear on practical use cases:

- When should I use temperature = 0.0?
- When should I use temperature = 1.0?
- What about values in between?

Can someone explain with concrete examples?`,
        tags: ['api', 'parameters', 'temperature', 'configuration'],
        userId: 'user2',
        authorUsername: 'prompt_master',
        createdTime: new Date('2026-01-24T10:45:00').toISOString(),
        lastModifiedTime: new Date('2026-01-24T10:45:00').toISOString(),
        currentState: {
            stateId: 'ANSWERED' as PromptState,
            flowId: 'prompt-flow',
        },
        score: 27,
        viewCount: 412,
        answerCount: 3,
        favoriteCount: 6,
        answers: [],
        comments: [],
        acceptedAnswerId: null,
        ...baseFields(),
        revisionNumber: 1,
        usageCount: 8,
        commentCount: 0,
    } as any,
    {
        id: 'prompt6',
        title: 'XML vs JSON for structured outputs - which is better?',
        description: 'Should I ask Claude to return XML or JSON for structured data?',
        body: null,
        tags: ['structured-output', 'xml', 'json', 'data-format'],
        userId: 'user3',
        authorUsername: 'claude_wizard',
        createdTime: new Date('2026-01-23T13:15:00').toISOString(),
        lastModifiedTime: new Date('2026-01-23T13:15:00').toISOString(),
        currentState: {
            stateId: 'OPEN' as PromptState,
            flowId: 'prompt-flow',
        },
        score: 15,
        viewCount: 223,
        answerCount: 2,
        favoriteCount: 4,
        answers: [],
        comments: [],
        acceptedAnswerId: null,
        ...baseFields(),
        revisionNumber: 1,
        usageCount: 3,
        commentCount: 0,
    } as any,
];

// Mock Service
export const mockDataService = {
    // Get all prompts with optional filters
    getPrompts: async (filter: 'hot' | 'newest' | 'unanswered' = 'hot', page = 1, pageSize = 20, tagName?: string) => {
        let filtered = [...mockPrompts];

        if (tagName) {
            filtered = filtered.filter(p => p.tags.includes(tagName));
        }

        if (filter === 'unanswered') {
            filtered = filtered.filter(p => p.answerCount === 0);
        }

        if (filter === 'newest') {
            filtered.sort((a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime());
        } else {
            // Hot = sort by score
            filtered.sort((a, b) => b.score - a.score);
        }

        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const paged = filtered.slice(start, end);

        return {
            list: paged.map(row => ({ row })),
            currentPage: page,
            maxPages: Math.ceil(filtered.length / pageSize),
            totalRecords: filtered.length,
        };
    },

    // Get single prompt by ID
    getPromptById: async (id: string) => {
        const prompt = mockPrompts.find(p => p.id === id);
        if (!prompt) throw new Error('Prompt not found');

        // Increment view count (in real app, this would be server-side)
        prompt.viewCount += 1;

        return prompt;
    },

    // Get prompts by tag
    getPromptsByTag: async (tagName: string) => {
        return mockPrompts.filter(p => p.tags.includes(tagName));
    },

    // Get user by ID
    getUserById: async (id: string) => {
        const user = mockUsers.find(u => u.id === id);
        if (!user) throw new Error('User not found');
        return user;
    },

    // Get all users
    getUsers: async () => {
        return mockUsers;
    },

    // Get popular tags
    getTags: async () => {
        const tagCounts: Record<string, number> = {};
        const tagDescriptions: Record<string, string> = {
            'prompt-engineering': 'Techniques and strategies for crafting effective AI prompts',
            'code-generation': 'Using AI to generate code and programming solutions',
            'python': 'Python programming language related prompts',
            'best-practices': 'Recommended approaches and patterns for prompt engineering',
            'persona': 'Creating and maintaining AI personas and characters',
            'character-ai': 'Building conversational AI with specific personalities',
            'conversation': 'Multi-turn conversations and dialogue management',
            'consistency': 'Maintaining consistent behavior across interactions',
            'api': 'Working with the Anthropic API and other AI APIs',
            'prompt-chaining': 'Breaking down complex tasks into multiple prompts',
            'workflow': 'Designing AI-powered workflows and pipelines',
            'conversation-design': 'Structuring effective conversations with AI',
            'documents': 'Working with documents and long-form content',
            'file-upload': 'Handling file uploads and document processing',
            'performance': 'Optimizing prompt performance and response quality',
            'parameters': 'Understanding and using API parameters',
            'temperature': 'Controlling randomness and creativity in responses',
            'configuration': 'Configuring AI model settings',
            'structured-output': 'Generating structured data formats',
            'xml': 'Using XML for prompt structuring',
            'json': 'Using JSON for data interchange',
            'data-format': 'Different data formats and their use cases',
        };

        mockPrompts.forEach(prompt => {
            prompt.tags.forEach(tag => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
        });

        return Object.entries(tagCounts)
            .map(([name, count]) => ({
                name,
                count,
                description: tagDescriptions[name] || `Questions tagged with ${name}`
            }))
            .sort((a, b) => b.count - a.count);
    },

    // Vote on prompt
    upvote: async (promptId: string) => {
        const prompt = mockPrompts.find(p => p.id === promptId);
        if (prompt) {
            prompt.score += 1;
        }
        return prompt;
    },

    downvote: async (promptId: string) => {
        const prompt = mockPrompts.find(p => p.id === promptId);
        if (prompt) {
            prompt.score -= 1;
        }
        return prompt;
    },

    // Add favorite
    addFavorite: async (promptId: string) => {
        const prompt = mockPrompts.find(p => p.id === promptId);
        if (prompt) {
            prompt.favoriteCount += 1;
        }
        return prompt;
    },

    // Create prompt
    createPrompt: async (data: { title: string; description: string; body?: string | null; tags: string[] }) => {
        const newPrompt: Prompt = {
            id: `prompt${mockPrompts.length + 1}`,
            ...data,
            userId: 'user1', // Current user
            authorUsername: 'ai_enthusiast',
            createdTime: new Date().toISOString(),
            lastModifiedTime: new Date().toISOString(),
            currentState: {
                stateId: 'OPEN' as PromptState,
                flowId: 'prompt-flow',
            },
            score: 0,
            viewCount: 0,
            answerCount: 0,
            favoriteCount: 0,
            answers: [],
            comments: [],
            acceptedAnswerId: null,
            ...baseFields(),
            isFeatured: false,
            template: null,
            systemPrompt: null,
            taskType: null,
            validationScore: 0,
            commentCount: 0,
            revisionNumber: 1,
            usageCount: 0,
        } as any;

        mockPrompts.unshift(newPrompt);
        return newPrompt;
    },

    // Add answer
    addAnswer: async (promptId: string, body: string) => {
        const prompt = mockPrompts.find(p => p.id === promptId);
        if (!prompt) throw new Error('Prompt not found');

        const newAnswer: Answer = {
            id: `answer${Date.now()}`,
            promptId,
            userId: 'user1',
            authorUsername: 'ai_enthusiast',
            body,
            createdTime: new Date().toISOString(),
            score: 0,
            isAccepted: false,
            commentCount: 0,
            revisionNumber: 1,
            attachments: [],
            ...baseFields(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            lastModifiedTime: new Date().toISOString(),
        };

        prompt.answers.push(newAnswer);
        prompt.answerCount += 1;

        return newAnswer;
    },

    // Add comment
    addComment: async (promptId: string, content: string, answerId?: string) => {
        const prompt = mockPrompts.find(p => p.id === promptId);
        if (!prompt) throw new Error('Prompt not found');

        const newComment: Comment = {
            id: `comment${Date.now()}`,
            promptId,
            author: 'user1',
            content,
            createdTime: new Date().toISOString(),
            lastModifiedTime: new Date().toISOString(),
            ...baseFields(),
        } as any;

        if (answerId) {
            const answer = prompt.answers.find(a => a.id === answerId);
            if (answer) {
                // In real app, answer would have a comment collection or counter
                answer.commentCount += 1;
            }
        } else {
            prompt.comments.push(newComment);
            prompt.commentCount += 1;
        }

        return newComment;
    },
};
