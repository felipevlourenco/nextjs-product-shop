import { ReactNode } from 'react';

export default function Header({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <header>
            SHARED HEADER: {title}
            {children}
        </header>
    );
}
