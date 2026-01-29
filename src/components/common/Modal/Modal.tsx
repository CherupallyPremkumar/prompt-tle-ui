import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/utils/utils';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    className,
}) => {
    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
            <div
                className={cn(
                    "relative w-full max-w-md glass p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] animate-in zoom-in-95 slide-in-from-bottom-4 duration-300",
                    className
                )}
            >
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </button>
                {title && (
                    <div className="mb-4 text-lg font-semibold leading-none tracking-tight">
                        {title}
                    </div>
                )}
                <div>{children}</div>
            </div>
        </div>,
        document.body
    );
};
