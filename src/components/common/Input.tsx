import React from 'react';
import { cn } from '@/utils/utils';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-12 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 outline-none disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";
