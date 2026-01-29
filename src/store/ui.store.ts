import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { PendingAction } from '../types/auth.types';

interface UIStore {
    isAuthModalOpen: boolean;
    pendingAction: PendingAction | null;

    openAuthModal: (pendingAction?: PendingAction) => void;
    closeAuthModal: () => void;
    setPendingAction: (action: PendingAction | null) => void;
}

export const useUIStore = create<UIStore>()(
    devtools(
        (set) => ({
            isAuthModalOpen: false,
            pendingAction: null,

            openAuthModal: (pendingAction: any = null) =>
                set({ isAuthModalOpen: true, pendingAction }),
            closeAuthModal: () =>
                set({ isAuthModalOpen: false, pendingAction: null }),
            setPendingAction: (pendingAction) =>
                set({ pendingAction }),
        }),
        { name: 'UIStore' }
    )
);
