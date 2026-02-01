import * as z from 'zod';

export const usePromptFormSchema = () => {
    const promptSchema = z.object({
        title: z
            .string()
            .min(15, 'Title must be at least 15 characters')
            .max(200, 'Title must be less than 200 characters'),
        description: z
            .string()
            .min(30, 'Description must be at least 30 characters'),
        body: z.string().optional(),
        tags: z.string().min(2, 'At least one tag is required'),
    });

    return { promptSchema };
};

export type PromptFormValues = z.infer<ReturnType<typeof usePromptFormSchema>['promptSchema']>;