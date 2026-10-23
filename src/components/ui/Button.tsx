import clsx from 'clsx';
import { HTMLAttributes } from 'react';
import './Button.css';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    variant: 'primary' | 'secondary';
    loading?: boolean;
    disabled?: boolean;
}

export default function Button({
    children,
    onClick,
    variant,
    className,
    disabled,
    loading,
    ...props
}: ButtonProps) {
    return (
        <button
            {...props}
            onClick={onClick}
            disabled={disabled || loading}
            className={clsx('button', `button-${variant}`, className)}
        >
            {children}
        </button>
    );
}
