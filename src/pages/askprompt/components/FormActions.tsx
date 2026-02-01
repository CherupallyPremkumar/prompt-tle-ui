import React from 'react';
import { Button } from '@/components/common/Button';

interface FormActionsProps {
    isSubmitting: boolean;
    isUploading: boolean;
    onDiscard: () => void;
}

export const FormActions: React.FC<FormActionsProps> = ({
                                                            isSubmitting,
                                                            isUploading,
                                                            onDiscard,
                                                        }) => {
    return (
        <div className="pt-6 flex flex-col sm:flex-row items-center gap-6">
            <Button
                type="submit"
                className="w-full sm:w-auto h-16 px-12 text-lg font-black shadow-xl shadow-orange-500/20"
                disabled={isSubmitting || isUploading}
            >
                {isSubmitting || isUploading ? (
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {isUploading ? 'Uploading Image...' : 'Publishing...'}
                    </div>
                ) : (
                    'Publish Prompt'
                )}
            </Button>
            <button
                type="button"
                onClick={onDiscard}
                className="text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest px-8"
            >
                Discard Draft
            </button>
        </div>
    );
};