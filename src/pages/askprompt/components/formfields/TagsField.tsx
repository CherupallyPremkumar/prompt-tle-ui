import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';
import { AlertCircle, Search } from 'lucide-react';
import { Input } from '@/components/common/Input';
import { FormFieldWrapper } from './FormFieldWrapper';
import { FORM_LABELS, FORM_PLACEHOLDERS, HELP_TEXT } from '../../constants';
import { PromptFormData } from '../../types';

interface TagsFieldProps {
    register: UseFormRegister<PromptFormData>;
    error?: FieldError;
}

export const TagsField: React.FC<TagsFieldProps> = ({ register, error }) => {
    return (
        <FormFieldWrapper>
            <div className="mb-6">
                <label className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-2">
                    {FORM_LABELS.tags} <span className="text-orange-500">*</span>
                </label>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    Add up to 5 tags to describe what your prompt is about.
                    Separate tags with{' '}
                    <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px] font-bold">
                        COMMAS
                    </kbd>
                    .
                </p>
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    <Input
                        {...register('tags')}
                        placeholder={FORM_PLACEHOLDERS.tags}
                        className={`pl-12 h-14 rounded-xl ${
                            error ? 'border-red-300' : ''
                        }`}
                    />
                </div>
                {error && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-red-600 font-medium">
                        <AlertCircle className="w-4 h-4" />
                        {error.message}
                    </div>
                )}
            </div>
        </FormFieldWrapper>
    );
};