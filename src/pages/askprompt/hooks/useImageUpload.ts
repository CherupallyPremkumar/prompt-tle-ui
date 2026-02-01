import { useState } from 'react';
import toast from 'react-hot-toast';
import { MAX_FILE_SIZE } from '../constants';

export const useImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            toast.error('File size must be less than 5MB');
            return;
        }

        setSelectedFile(file);

        // Generate preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
    };

    return {
        selectedFile,
        previewUrl,
        handleFileChange,
        removeImage,
    };
};