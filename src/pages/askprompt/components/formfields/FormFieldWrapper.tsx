import React from 'react';

interface FormFieldWrapperProps {
    children: React.ReactNode;
    className?: string;
}

export const FormFieldWrapper: React.FC<FormFieldWrapperProps> = ({
                                                                      children,
                                                                      className = '',
                                                                  }) => {
    return (
        <div
            className={`bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow ${className}`}
        >
            {children}
        </div>
    );
};