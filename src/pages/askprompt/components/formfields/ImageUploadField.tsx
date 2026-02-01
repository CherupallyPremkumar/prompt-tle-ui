import React from 'react';
import { FormFieldWrapper } from './FormFieldWrapper';
import { ImagePreview } from './ImagePreview';
import { ImageDropzone } from './ImageDropzone';
import { FORM_LABELS, HELP_TEXT } from '../../constants';

interface ImageUploadFieldProps {
    previewUrl: string | null;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove: () => void;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
                                                                      previewUrl,
                                                                      onFileChange,
                                                                      onRemove,
                                                                  }) => {
    return (
        <FormFieldWrapper>
            <div className="mb-6">
                <label className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-2">
                    {FORM_LABELS.image}
                </label>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    {HELP_TEXT.image}
                </p>

                <div className="relative">
                    {previewUrl ? (
                        <ImagePreview previewUrl={previewUrl} onRemove={onRemove} />
                    ) : (
                        <ImageDropzone onFileChange={onFileChange} />
                    )}
                </div>
            </div>
        </FormFieldWrapper>
    );
};