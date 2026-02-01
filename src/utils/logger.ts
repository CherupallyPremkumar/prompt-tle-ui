/**
 * Logger Utility
 * 
 * Centralized logging with environment-aware behavior.
 * - Development: All log levels enabled
 * - Production: Only warn and error enabled
 */

export enum LogLevel {
    DEBUG = 'DEBUG',
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR'
}

interface LogContext {
    [key: string]: unknown;
}

class Logger {
    private isDevelopment: boolean;

    constructor() {
        this.isDevelopment = import.meta.env.DEV || import.meta.env.MODE === 'development';
    }

    /**
     * Format log message with timestamp and context
     */
    private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
        const timestamp = new Date().toISOString();
        const contextStr = context ? ` ${JSON.stringify(context)}` : '';
        return `[${timestamp}] [${level}] ${message}${contextStr}`;
    }

    /**
     * Debug level logging (development only)
     */
    debug(message: string, context?: LogContext): void {
        if (this.isDevelopment) {
            console.log(this.formatMessage(LogLevel.DEBUG, message, context));
        }
    }

    /**
     * Info level logging (development only)
     */
    info(message: string, context?: LogContext): void {
        if (this.isDevelopment) {
            console.log(this.formatMessage(LogLevel.INFO, message, context));
        }
    }

    /**
     * Warning level logging (always enabled)
     */
    warn(message: string, context?: LogContext): void {
        console.warn(this.formatMessage(LogLevel.WARN, message, context));
    }

    /**
     * Error level logging (always enabled)
     */
    error(message: string, error?: Error | unknown, context?: LogContext): void {
        const errorContext = error instanceof Error
            ? { ...context, error: error.message, stack: error.stack }
            : { ...context, error };

        console.error(this.formatMessage(LogLevel.ERROR, message, errorContext));
    }

    /**
     * Group logs together (development only)
     */
    group(label: string, callback: () => void): void {
        if (this.isDevelopment) {
            console.group(label);
            callback();
            console.groupEnd();
        } else {
            callback();
        }
    }
}

// Export singleton instance
export const logger = new Logger();
