import clsx from 'clsx';
import { ReactNode } from 'react';
import './Header.css';

export default function Header({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <header className={clsx('header', 'p-4')}>
            SHARED HEADER: {title}
            {children}
        </header>
    );
}
