import { useUIStore } from '../../store/ui.store';
import type { PendingAction } from '../../types/auth.types';

export const useAuthModal = () => {
    const { isAuthModalOpen, openAuthModal, closeAuthModal, pendingAction } = useUIStore();

    return {
        isOpen: isAuthModalOpen,
        openAuthModal: (action?: PendingAction) => openAuthModal(action),
        closeAuthModal,
        pendingAction
    };
};
