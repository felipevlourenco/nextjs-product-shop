'use client';

import { ElementType, useEffect, useEffectEvent, useRef } from 'react';

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
    const onIntersect = useEffectEvent(callback);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => onIntersect(entries),
            {
                rootMargin: '100px',
            },
        );

        if (listItemRef.current) {
            observer.observe(listItemRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return <Component ref={listItemRef} />;
}
