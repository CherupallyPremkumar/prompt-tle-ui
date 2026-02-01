export const WS_CONFIG = {
    URL: import.meta.env.VITE_WS_URL || 'ws://localhost:8080/ws/stats',
    RECONNECT_ATTEMPTS: 5,
    RECONNECT_DELAY: 1000,
};
