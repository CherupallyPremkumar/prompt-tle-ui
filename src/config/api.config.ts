export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
    TIMEOUT: 30000,
    USE_MOCKS: import.meta.env.VITE_USE_MOCKS === 'true',
};
