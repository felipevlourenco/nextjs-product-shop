'use client';
import { useCart } from '../CartContext';
import { formatPrice } from '../utils';

export default function CartSummary() {
    const { cart } = useCart();
    return <span>€ {formatPrice(cart.total)}</span>;
}
