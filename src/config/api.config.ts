export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://98.93.49.18:8080',
    TIMEOUT: 30000,
    USE_MOCKS: import.meta.env.VITE_USE_MOCKS === 'true',
    TENANT_ID: import.meta.env.VITE_TENANT_ID || 'tenant1',
};
