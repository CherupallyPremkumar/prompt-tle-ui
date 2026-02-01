import { queryService } from './chenile-query.service';
import { logger } from '@/utils/logger';

export interface TagStat {
    name: string;
    count: number;
}

class TagQueryService {
    /**
     * Get popular tags from backend
     * Uses Chenile query service for consistency
     */
    async getPopularTags(limit: number = 10): Promise<TagStat[]> {
        try {
            // Use query service to fetch popular tags
            // This assumes you have a 'tag.popular' query defined in backend
            const response = await queryService.search<TagStat>(
                'tag.popular',
                {},
                1,
                limit
            );

            if (!response.list) {
                return [];
            }

            // Extract tags from response
            return response.list.map(item => item.row);
        } catch (error) {
            logger.error('[TagQueryService] Failed to fetch popular tags', error);
            // Return empty array on error to prevent UI breakage
            return [];
        }
    }

    /**
     * Get tag details by name
     */
    async getTagByName(tagName: string): Promise<TagStat | null> {
        try {
            const response = await queryService.search<TagStat>(
                'tag.byName',
                { name: tagName },
                1,
                1
            );

            if (!response.list || response.list.length === 0) {
                return null;
            }

            return response.list[0].row;
        } catch (error) {
            logger.error('[TagQueryService] Failed to fetch tag', error);
            return null;
        }
    }

    /**
     * Search tags by partial name
     */
    async searchTags(query: string, limit: number = 20): Promise<TagStat[]> {
        try {
            const response = await queryService.search<TagStat>(
                'tag.search',
                { query },
                1,
                limit
            );

            if (!response.list) {
                return [];
            }

            return response.list.map(item => item.row);
        } catch (error) {
            logger.error('[TagQueryService] Failed to search tags', error);
            return [];
        }
    }
}

export const tagQueryService = new TagQueryService();
