import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TitleField } from './FormFields/TitleField';
import { DescriptionField } from './FormFields/DescriptionField';
import { ImageUploadField } from './FormFields/ImageUploadField';
import { BodyField } from './FormFields/BodyField';
import { TagsField } from './FormFields/TagsField';
import { FormActions } from './FormActions';
import { useImageUpload } from '../hooks/useImageUpload';
import { usePromptFormSchema } from '../hooks/usePromptFormSchema';
import { PromptFormData } from '../types';

interface PromptFormProps {
    onSubmit: (data: PromptFormData, imageFile: File | null) => Promise<void>;
    onDiscard: () => void;
    isSubmitting: boolean;
    isUploading: boolean;
}

export const PromptForm: React.FC<PromptFormProps> = ({
                                                          onSubmit,
                                                          onDiscard,
                                                          isSubmitting,
                                                          isUploading,
                                                      }) => {
    const { promptSchema } = usePromptFormSchema();
    const {
        selectedFile,
        previewUrl,
        handleFileChange,
        removeImage,
    } = useImageUpload();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PromptFormData>({
        resolver: zodResolver(promptSchema),
    });

    const handleFormSubmit = async (data: PromptFormData) => {
        await onSubmit(data, selectedFile);
    };

    return (
        <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700 delay-100"
        >
            {/* Title Field */}
            <TitleField register={register} error={errors.title} />

            {/* Description Field */}
            <DescriptionField register={register} error={errors.description} />

            {/* Image Upload Field */}
            <ImageUploadField
                previewUrl={previewUrl}
                onFileChange={handleFileChange}
                onRemove={removeImage}
            />

            {/* Body Field */}
            <BodyField register={register} />

            {/* Tags Field */}
            <TagsField register={register} error={errors.tags} />

            {/* Form Actions */}
            <FormActions
                isSubmitting={isSubmitting}
                isUploading={isUploading}
                onDiscard={onDiscard}
            />
        </form>
    );
};