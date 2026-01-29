import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_CONFIG } from '../../config/api.config';
import { getCookie } from '../../utils/cookies';

class ApiClient {
    private client: AxiosInstance;
    private isRefreshing = false;
    private refreshQueue: Array<{
        resolve: (value?: any) => void;
        reject: (reason?: any) => void;
    }> = [];

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
    }

    private setupInterceptors() {
        // Request interceptor - add CSRF token
        this.client.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                const csrfToken = getCookie('csrf_token');
                if (csrfToken && config.headers) {
                    config.headers['X-CSRF-Token'] = csrfToken;
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
                    // @ts-ignore
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
                        await this.client.post('/api/auth/refresh');
                        this.refreshQueue.forEach((promise) => promise.resolve());
                        this.refreshQueue = [];
                        return this.client(originalRequest);
                    } catch (refreshError) {
                        this.refreshQueue.forEach((promise) => promise.reject(refreshError));
                        this.refreshQueue = [];
                        window.dispatchEvent(new CustomEvent('auth:logout'));
                        return Promise.reject(refreshError);
                    } finally {
                        this.isRefreshing = false;
                    }
                }

                return Promise.reject(error);
            }
        );
    }

    get<T = any>(url: string, config = {}) {
        return this.client.get<T>(url, config);
    }

    post<T = any>(url: string, data?: any, config = {}) {
        return this.client.post<T>(url, data, config);
    }

    put<T = any>(url: string, data?: any, config = {}) {
        return this.client.put<T>(url, data, config);
    }

    delete<T = any>(url: string, config = {}) {
        return this.client.delete<T>(url, config);
    }

    patch<T = any>(url: string, data?: any, config = {}) {
        return this.client.patch<T>(url, data, config);
    }
}

export const apiClient = new ApiClient();
