import React from 'react';
import { Button } from '@/components/common/Button';

interface CommentFormProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    onCancel: () => void;
}

export const CommentForm: React.FC<CommentFormProps> = ({
                                                            value,
                                                            onChange,
                                                            onSubmit,
                                                            onCancel,
                                                        }) => {
    return (
        <div className="mb-6 p-4 glass rounded-2xl border border-gray-200">
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full p-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                rows={3}
            />
            <div className="flex justify-end gap-2 mt-3">
                <Button variant="ghost" size="sm" onClick={onCancel}>
                    Cancel
                </Button>
                <Button
                    size="sm"
                    onClick={onSubmit}
                    disabled={!value.trim()}
                >
                    Post Comment
                </Button>
            </div>
        </div>
    );
};