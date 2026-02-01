import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosRequestConfig } from 'axios';
import { API_CONFIG } from '../../config/api.config';
import { getCookie } from '../../utils/cookies';
import { useAuthStore } from '../../store/auth.store';

interface RetryConfig {
    retries?: number;
    retryDelay?: number;
    retryCondition?: (error: AxiosError) => boolean;
}

interface RequestConfig extends AxiosRequestConfig {
    retry?: RetryConfig;
    timeout?: number;
}

class ApiClient {
    private client: AxiosInstance;
    private isRefreshing = false;
    private refreshQueue: Array<{
        resolve: (value?: unknown) => void;
        reject: (reason?: unknown) => void;
    }> = [];
    private readonly DEFAULT_RETRY_CONFIG: RetryConfig = {
        retries: 3,
        retryDelay: 1000,
        retryCondition: (error: AxiosError) => {
            // Retry on network errors or 5xx server errors
            return !error.response || (error.response.status >= 500 && error.response.status < 600);
        }
    };

    constructor() {
        this.client = axios.create({
            baseURL: API_CONFIG.BASE_URL,
            timeout: API_CONFIG.TIMEOUT,
            withCredentials: true, // Send cookies
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();

        // Setup mock interceptors if mocking is enabled
        if (API_CONFIG.USE_MOCKS) {
            this.setupMockInterceptors();
        }
    }

    private setupInterceptors() {
        // Request interceptor - add CSRF token
        this.client.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                const csrfToken = getCookie('csrf_token');
                if (config.headers) {
                    if (csrfToken) config.headers['X-CSRF-Token'] = csrfToken;
                    config.headers['x-chenile-tenant-id'] = API_CONFIG.TENANT_ID;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response interceptor - handle token refresh
        this.client.interceptors.response.use(
            (response) => response,
            async (error: AxiosError) => {
                const originalRequest = error.config as any;

                if (
                    error.response?.status === 401 &&
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    error.response?.data?.code === 'TOKEN_EXPIRED' &&
                    originalRequest &&
                    !originalRequest._retry
                ) {
                    if (this.isRefreshing) {
                        return new Promise((resolve, reject) => {
                            this.refreshQueue.push({ resolve, reject });
                        })
                            .then(() => this.client(originalRequest))
                            .catch((err) => Promise.reject(err));
                    }

                    originalRequest._retry = true;
                    this.isRefreshing = true;

                    try {
                        await this.client.post('/api/auth/refresh-token');
                        this.refreshQueue.forEach((promise) => promise.resolve());
                        this.refreshQueue = [];
                        return this.client(originalRequest);
                    } catch (refreshError) {
                        this.refreshQueue.forEach((promise) => promise.reject(refreshError));
                        this.refreshQueue = [];
                        // Use proper state management instead of DOM events
                        useAuthStore.getState().logout();
                        return Promise.reject(refreshError);
                    } finally {
                        this.isRefreshing = false;
                    }
                }

                return Promise.reject(error);
            }
        );
    }

    /**
     * Retry logic with exponential backoff
     */
    private async retryRequest<T>(
        requestFn: () => Promise<T>,
        retryConfig: RetryConfig,
        attempt = 0
    ): Promise<T> {
        try {
            return await requestFn();
        } catch (error) {
            const axiosError = error as AxiosError;
            const shouldRetry = retryConfig.retryCondition?.(axiosError) ?? false;
            const maxRetries = retryConfig.retries ?? 0;

            if (shouldRetry && attempt < maxRetries) {
                // Exponential backoff: delay * (2 ^ attempt)
                const delay = (retryConfig.retryDelay ?? 1000) * Math.pow(2, attempt);
                await new Promise(resolve => setTimeout(resolve, delay));
                return this.retryRequest(requestFn, retryConfig, attempt + 1);
            }

            throw error;
        }
    }

    get<T>(url: string, config: RequestConfig = {}) {
        const { retry, ...axiosConfig } = config;
        const retryConfig = { ...this.DEFAULT_RETRY_CONFIG, ...retry };

        return this.retryRequest(
            () => this.client.get<T>(url, axiosConfig),
            retryConfig
        );
    }

    post<T>(url: string, data?: unknown, config: RequestConfig = {}) {
        const { retry, ...axiosConfig } = config;
        const retryConfig = { ...this.DEFAULT_RETRY_CONFIG, ...retry };

        return this.retryRequest(
            () => this.client.post<T>(url, data, axiosConfig),
            retryConfig
        );
    }

    put<T>(url: string, data?: unknown, config: RequestConfig = {}) {
        const { retry, ...axiosConfig } = config;
        const retryConfig = { ...this.DEFAULT_RETRY_CONFIG, ...retry };

        return this.retryRequest(
            () => this.client.put<T>(url, data, axiosConfig),
            retryConfig
        );
    }

    delete<T>(url: string, config: RequestConfig = {}) {
        const { retry, ...axiosConfig } = config;
        const retryConfig = { ...this.DEFAULT_RETRY_CONFIG, ...retry };

        return this.retryRequest(
            () => this.client.delete<T>(url, axiosConfig),
            retryConfig
        );
    }

    patch<T>(url: string, data?: unknown, config: RequestConfig = {}) {
        const { retry, ...axiosConfig } = config;
        const retryConfig = { ...this.DEFAULT_RETRY_CONFIG, ...retry };

        return this.retryRequest(
            () => this.client.patch<T>(url, data, axiosConfig),
            retryConfig
        );
    }

    /**
     * Setup mock API interceptors for development/testing
     */
    private setupMockInterceptors() {
        // Store for mock OTP codes (email -> code)
        const otpStore = new Map<string, string>();

        this.client.interceptors.request.use((config) => {
            // Mock OTP send endpoint
            if (config.url === '/api/auth/otp/send' && config.method === 'post') {
                const email = (config.data as any)?.email;
                if (email) {
                    // Generate a mock 6-digit OTP
                    const mockOtp = '123456'; // In real scenario, this would be random
                    otpStore.set(email, mockOtp);
                    console.log(`[MOCK] OTP sent to ${email}: ${mockOtp}`);

                    // Return mock success response
                    return Promise.reject({
                        config,
                        response: {
                            status: 200,
                            data: { success: true },
                            headers: {},
                            config
                        },
                        isAxiosError: true
                    });
                }
            }

            // Mock OTP verify endpoint
            if (config.url === '/api/auth/otp/verify' && config.method === 'post') {
                const { email, code } = (config.data as any) || {};
                const storedOtp = otpStore.get(email);

                if (code === storedOtp) {
                    console.log(`[MOCK] OTP verified for ${email}`);
                    // Return mock user data
                    return Promise.reject({
                        config,
                        response: {
                            status: 200,
                            data: {
                                payload: {
                                    id: 'mock-user-id',
                                    email,
                                    username: email.split('@')[0],
                                    fullName: email.split('@')[0],
                                    provider: 'email',
                                    status: 'ACTIVE',
                                    isActive: true,
                                    emailVerified: true,
                                    createdAt: new Date().toISOString(),
                                    roles: [{ id: 'user', name: 'User', description: null, acls: [] }]
                                }
                            },
                            headers: {},
                            config
                        },
                        isAxiosError: true
                    });
                } else {
                    console.log(`[MOCK] Invalid OTP for ${email}`);
                    return Promise.reject({
                        config,
                        response: {
                            status: 400,
                            data: { description: 'Invalid or expired OTP' },
                            headers: {},
                            config
                        },
                        isAxiosError: true
                    });
                }
            }

            return config;
        });
    }
}

export const apiClient = new ApiClient();
