import { apiClient } from '../core/api/client';
import axios from 'axios';
import { API_CONFIG } from '../config/api.config';
import { logger } from '@/utils/logger';

interface PresignedUrlResponse {
    uploadId: string;
    uploadUrl: string;
    fileKey: string;
}

interface ConfirmResponse {
    success: boolean;
    fileUrl: string;
    status: string;
}

class UploadService {
    /**
     * Orchestrates the full upload flow
     */
    async uploadImage(file: File, userId: string): Promise<string> {
        if (API_CONFIG.USE_MOCKS) {
            // Mock delay and return a random placeholder
            await new Promise(resolve => setTimeout(resolve, 1500));
            return `https://picsum.photos/seed/${Math.random()}/800/450`;
        }

        try {
            // 1. Get Presigned URL
            const { uploadId, uploadUrl, fileKey } = await this.getPresignedUrl(file);

            // 2. Upload to S3
            await this.uploadToS3(uploadUrl, file, uploadId, userId);

            // 3. Confirm Upload
            const { fileUrl } = await this.confirmUpload(uploadId, fileKey);

            return fileUrl;
        } catch (error) {
            logger.error('Upload flow failed', error);
            throw error;
        }
    }

    private async getPresignedUrl(file: File): Promise<PresignedUrlResponse> {
        const response = await apiClient.post<any>('/api/uploads/presigned-url', {
            filename: file.name,
            contentType: file.type,
            fileSize: file.size,
            folder: 'prompts/thumbnails'
        });

        // Handle both wrapped and unwrapped payloads
        const payload = response.data.payload || response.data;
        return payload;
    }

    private async uploadToS3(url: string, file: File, uploadId: string, userId: string): Promise<void> {
        // Use a clean axios instance to avoid global interceptors (like Auth headers)
        await axios.put(url, file, {
            headers: {
                'Content-Type': file.type,
                'x-amz-meta-original-filename': file.name,
                'x-amz-meta-upload-id': uploadId,
                'x-amz-meta-user-id': userId
            }
        });
    }

    private async confirmUpload(uploadId: string, fileKey: string): Promise<ConfirmResponse> {
        const response = await apiClient.post<any>('/api/uploads/confirm', {
            uploadId,
            fileKey
        });

        const payload = response.data.payload || response.data;
        return payload;
    }
}

export const uploadService = new UploadService();
