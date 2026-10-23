import FloatingCart from '@/app/features/cart/components/FloatingCart';
import { Suspense } from 'react';

export default function Default() {
    return (
        <Suspense fallback="Loading cart">
            <FloatingCart />
        </Suspense>
    );
}
