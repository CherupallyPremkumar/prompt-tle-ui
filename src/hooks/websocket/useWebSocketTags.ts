import { useEffect } from 'react';
import { websocketService } from '@/services/websocket.service';
import { TagStat } from '@/pages/home/types';

export const useWebSocketTags = (
    onUpdate: (tags: TagStat[]) => void
) => {
    useEffect(() => {
        const unsubscribe = websocketService.subscribe('TAGS_UPDATE', onUpdate);
        return unsubscribe;
    }, [onUpdate]);
};
