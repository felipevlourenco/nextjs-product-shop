'use client';

import { Button } from 'tintora';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils';

export default function CartSummary() {
    const { cart, toggleCart } = useCart();

    return (
        <Button variant="primary" size="small" onClick={toggleCart}>
            € {formatPrice(cart.total)}
        </Button>
    );
}
