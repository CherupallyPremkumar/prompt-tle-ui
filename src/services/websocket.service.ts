import { logger } from '../utils/logger';

type MessageHandler = (data: any) => void;

interface WebSocketMessage {
    type: string;
    data: any;
}

class WebSocketService {
    private ws: WebSocket | null = null;
    private handlers: Map<string, Set<MessageHandler>> = new Map();
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private reconnectDelay = 1000;
    private url: string = '';

    connect(url: string) {
        if (this.ws?.readyState === WebSocket.OPEN) {
            logger.debug('[WebSocket] Already connected');
            return;
        }

        this.url = url;
        this.ws = new WebSocket(url);

        this.ws.onopen = () => {
            logger.info('[WebSocket] Connected to', { url });
            this.reconnectAttempts = 0;
        };

        this.ws.onmessage = (event) => {
            try {
                const message: WebSocketMessage = JSON.parse(event.data);
                const handlers = this.handlers.get(message.type);

                if (handlers) {
                    handlers.forEach(handler => handler(message.data));
                } else {
                    logger.warn('[WebSocket] No handlers for message type', { type: message.type });
                }
            } catch (error) {
                logger.error('[WebSocket] Parse error', error);
            }
        };

        this.ws.onclose = () => {
            logger.info('[WebSocket] Disconnected');
            this.attemptReconnect();
        };

        this.ws.onerror = (error) => {
            logger.error('[WebSocket] Error', error);
        };
    }

    private attemptReconnect() {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            logger.error('[WebSocket] Max reconnect attempts reached. Giving up.');
            return;
        }

        this.reconnectAttempts++;
        const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

        logger.info('[WebSocket] Reconnecting', {
            delay,
            attempt: this.reconnectAttempts,
            maxAttempts: this.maxReconnectAttempts
        });

        setTimeout(() => {
            if (this.url) {
                this.connect(this.url);
            }
        }, delay);
    }

    subscribe(type: string, handler: MessageHandler) {
        if (!this.handlers.has(type)) {
            this.handlers.set(type, new Set());
        }
        this.handlers.get(type)!.add(handler);

        logger.debug('[WebSocket] Subscribed to', { type });

        // Return unsubscribe function
        return () => {
            this.handlers.get(type)?.delete(handler);
            logger.debug('[WebSocket] Unsubscribed from', { type });
        };
    }

    disconnect() {
        if (this.ws) {
            logger.info('[WebSocket] Disconnecting...');
            this.ws.close();
            this.ws = null;
        }
        this.handlers.clear();
        this.reconnectAttempts = 0;
    }

    isConnected(): boolean {
        return this.ws?.readyState === WebSocket.OPEN;
    }
}

export const websocketService = new WebSocketService();
