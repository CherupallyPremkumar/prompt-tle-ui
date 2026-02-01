import React from 'react';
import { UploadCloud } from 'lucide-react';

interface ImageDropzoneProps {
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageDropzone: React.FC<ImageDropzoneProps> = ({
                                                                onFileChange,
                                                            }) => {
    return (
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-200 rounded-[2rem] cursor-pointer hover:bg-gray-50 hover:border-orange-300 transition-all group">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <div className="p-4 bg-orange-50 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-8 h-8 text-orange-500" />
                </div>
                <p className="mb-2 text-sm text-gray-700 font-bold">
                    Click to upload thumbnail
                </p>
                <p className="text-xs text-gray-400">PNG, JPG or WebP (MAX. 5MB)</p>
            </div>
            <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={onFileChange}
            />
        </label>
    );
};