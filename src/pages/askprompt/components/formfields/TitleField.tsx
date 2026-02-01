import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';
import { AlertCircle } from 'lucide-react';
import { Input } from '@/components/common/Input';
import { FormFieldWrapper } from './FormFieldWrapper';
import { FORM_LABELS, FORM_PLACEHOLDERS, HELP_TEXT } from '../../constants';
import { PromptFormData } from '../../types';

interface TitleFieldProps {
    register: UseFormRegister<PromptFormData>;
    error?: FieldError;
}

export const TitleField: React.FC<TitleFieldProps> = ({ register, error }) => {
    return (
        <FormFieldWrapper>
            <div className="mb-6">
                <label className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-2">
                    {FORM_LABELS.title} <span className="text-orange-500">*</span>
                </label>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    {HELP_TEXT.title}
                </p>
                <Input
                    {...register('title')}
                    placeholder={FORM_PLACEHOLDERS.title}
                    className={`h-14 text-base rounded-xl ${
                        error ? 'border-red-300 ring-red-100' : ''
                    }`}
                />
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