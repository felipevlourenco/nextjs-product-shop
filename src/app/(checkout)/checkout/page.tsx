'use client';

import { useCart } from '@/app/features/cart/context/CartContext';
import { formatPrice } from '@/app/features/cart/utils';
import './page.css';

export default function Checkout() {
    const { cart } = useCart();

    return (
        <div className="checkout-summary">
            <h1>Checkout</h1>
            <p className="checkout-summary__total">
                Total: € {formatPrice(cart.total)}
            </p>
        </div>
    );
}
