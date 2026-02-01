import React from 'react';
import { X } from 'lucide-react';

interface ImagePreviewProps {
    previewUrl: string;
    onRemove: () => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
                                                              previewUrl,
                                                              onRemove,
                                                          }) => {
    return (
        <div className="relative rounded-2xl overflow-hidden border border-gray-200 group">
            <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                    type="button"
                    onClick={onRemove}
                    className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                    aria-label="Remove image"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};