'use client';

import { ElementType, useEffect, useRef } from 'react';

interface ObserverProps<C extends ElementType = 'div'> {
    as?: C;
    callback: (entries: IntersectionObserverEntry[]) => void;
}

export default function Observer<C extends ElementType = 'div'>({
    callback,
    as,
}: ObserverProps<C>) {
    const Component: ElementType = as ?? 'div';
    const listItemRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(callback, {
            rootMargin: '100px',
        });

        if (listItemRef.current) {
            observer.observe(listItemRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [callback]);

    return <Component ref={listItemRef} />;
}
