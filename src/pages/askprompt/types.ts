import * as z from 'zod';

export const promptSchema = z.object({
    title: z.string().min(15, 'Title must be at least 15 characters').max(200),
    description: z.string().min(30, 'Description must be at least 30 characters'),
    body: z.string().optional(),
    tags: z.string().min(2, 'At least one tag is required'),
});

export type PromptFormValues = z.infer<typeof promptSchema>;