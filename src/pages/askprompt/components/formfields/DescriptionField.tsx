import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';
import { AlertCircle } from 'lucide-react';
import { FormFieldWrapper } from './FormFieldWrapper';
import { FORM_LABELS, FORM_PLACEHOLDERS, HELP_TEXT } from '../../constants';
import { PromptFormData } from '../../types';

interface DescriptionFieldProps {
    register: UseFormRegister<PromptFormData>;
    error?: FieldError;
}

export const DescriptionField: React.FC<DescriptionFieldProps> = ({
                                                                      register,
                                                                      error,
                                                                  }) => {
    return (
        <FormFieldWrapper>
            <div className="mb-6">
                <label className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-2">
                    {FORM_LABELS.description} <span className="text-orange-500">*</span>
                </label>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    {HELP_TEXT.description}
                </p>
                <textarea
                    {...register('description')}
                    className={`w-full h-48 p-4 border rounded-2xl text-base transition-all focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none leading-relaxed ${
                        error
                            ? 'border-red-300'
                            : 'border-gray-200 hover:border-gray-300'
                    }`}
                    placeholder={FORM_PLACEHOLDERS.description}
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