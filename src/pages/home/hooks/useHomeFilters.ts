import { useMemo } from 'react';
import { FilterType } from '../index';

export const useHomeFilters = (activeFilter: FilterType, tag?: string) => {
    const filters = useMemo(() => {
        const filterObj: any = {};

        if (activeFilter === 'unanswered') {
            filterObj.answerCount = 0;
        }

        if (tag) {
            filterObj.tags = [tag];
        }

        return filterObj;
    }, [activeFilter, tag]);

    const sortCriteria = useMemo(() => {
        if (activeFilter === 'newest') {
            return [{ name: 'createdTime', ascendingOrder: false }];
        }

        if (activeFilter === 'hot') {
            return [{ name: 'viewCount', ascendingOrder: false }];
        }

        return undefined;
    }, [activeFilter]);

    return { filters, sortCriteria };
};