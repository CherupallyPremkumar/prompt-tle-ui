import { useEffect } from 'react';

interface KeyboardShortcutsProps {
    onEscape?: () => void;
    onSearchFocus?: () => void;
}

export const useKeyboardShortcuts = ({ onEscape, onSearchFocus }: KeyboardShortcutsProps) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // ESC to close menus
            if (e.key === 'Escape' && onEscape) {
                onEscape();
            }

            // Ctrl/Cmd + K for search focus
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                onSearchFocus?.();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onEscape, onSearchFocus]);
};