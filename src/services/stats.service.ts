import { queryService } from './chenile-query.service';
import { logger } from '@/utils/logger';

export interface CommunityStats {
    promptsToday: number;
    activeUsers: number;
    answersGiven: number;
}

class StatsQueryService {
    /**
     * Get community statistics from backend
     * Uses Chenile query service for consistency
     */
    async getCommunityStats(): Promise<CommunityStats> {
        try {
            // Use query service to fetch community stats
            // This assumes you have a 'stats.community' query defined in backend
            const response = await queryService.search<CommunityStats>(
                'stats.community',
                {},
                1,
                1
            );

            if (!response.list || response.list.length === 0) {
                // Return default values if no data
                return {
                    promptsToday: 0,
                    activeUsers: 0,
                    answersGiven: 0
                };
            }

            return response.list[0].row;
        } catch (error) {
            logger.error('[StatsQueryService] Failed to fetch community stats', error);
            // Return default values on error to prevent UI breakage
            return {
                promptsToday: 0,
                activeUsers: 0,
                answersGiven: 0
            };
        }
    }
}

export const statsQueryService = new StatsQueryService();
