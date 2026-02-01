import React from 'react';

interface MobileMenuBackdropProps {
    onClick: () => void;
}

export const MobileMenuBackdrop: React.FC<MobileMenuBackdropProps> = ({ onClick }) => {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden animate-in fade-in duration-200"
            onClick={onClick}
            aria-hidden="true"
        />
    );
};