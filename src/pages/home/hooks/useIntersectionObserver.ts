import { useEffect, useRef } from 'react';

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
    enabled?: boolean;
}

export const useIntersectionObserver = (
    callback: () => void,
    options?: UseIntersectionObserverOptions
) => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { enabled = true, ...observerOptions } = options || {};

    useEffect(() => {
        if (!enabled) return;

        const target = targetRef.current;
        if (!target) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    callback();
                }
            },
            {
                threshold: 0.1,
                rootMargin: '100px', // Trigger 100px before reaching the element
                ...observerOptions,
            }
        );

        observer.observe(target);

        return () => {
            observer.disconnect();
        };
    }, [callback, enabled, observerOptions]);

    return targetRef;
};
