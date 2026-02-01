import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { Code2 } from 'lucide-react';
import { FormFieldWrapper } from './FormFieldWrapper';
import { FORM_LABELS, FORM_PLACEHOLDERS, HELP_TEXT } from '../../constants';
import { PromptFormData } from '../../types';

interface BodyFieldProps {
    register: UseFormRegister<PromptFormData>;
}

export const BodyField: React.FC<BodyFieldProps> = ({ register }) => {
    return (
        <FormFieldWrapper>
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <label className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        {FORM_LABELS.body}
                    </label>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-50 px-2 py-1 rounded">
            Optional
          </span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    {HELP_TEXT.body}
                </p>
                <div className="relative">
                    <Code2 className="absolute right-4 top-4 w-5 h-5 text-gray-300" />
                    <textarea
                        {...register('body')}
                        className="w-full h-64 p-6 border border-gray-200 rounded-3xl text-sm font-mono transition-all focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none hover:border-gray-300 bg-gray-50/50 leading-relaxed"
                        placeholder={FORM_PLACEHOLDERS.body}
                    />
                </div>
            </div>
        </FormFieldWrapper>
    );
};