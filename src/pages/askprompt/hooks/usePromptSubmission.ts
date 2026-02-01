import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { promptService } from '@/services/prompt.service';
import { uploadService } from '@/services/upload.service';
import { useAuth } from '@/hooks/auth/useAuth';
import { PromptFormData } from '../types';

export const usePromptSubmission = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const handleSubmit = async (data: PromptFormData, imageFile: File | null) => {
        try {
            setIsSubmitting(true);
            let imageUrl: string | undefined;

            // Upload image if provided
            if (imageFile && user) {
                setIsUploading(true);
                imageUrl = await uploadService.uploadImage(imageFile, user.id);
                setIsUploading(false);
            }

            // Split tags string into array
            const tagArray = data.tags
                .split(',')
                .map((t: string) => t.trim())
                .filter(Boolean);

            const payload = {
                ...data,
                tags: tagArray,
                imageUrl,
            };

            // Create prompt
            const response = await promptService.createPrompt(payload);
            const promptId = response.mutatedEntity?.id;

            // Auto-submit to move out of DRAFT state
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
        } finally {
            setIsSubmitting(false);
            setIsUploading(false);
        }
    };

    return {
        handleSubmit,
        isSubmitting,
        isUploading,
    };
};