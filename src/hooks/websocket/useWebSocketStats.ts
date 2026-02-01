import { useEffect } from 'react';
import { websocketService } from '@/services/websocket.service';
import { CommunityStats } from '@/pages/home/types';

export const useWebSocketStats = (
    onUpdate: (stats: CommunityStats) => void
) => {
    useEffect(() => {
        const unsubscribe = websocketService.subscribe('STATS_UPDATE', onUpdate);
        return unsubscribe;
    }, [onUpdate]);
};
