'use client';

import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import './FloatingCart.css';

export default function FloatingCart() {
    const { cart, isOpen, toggleCart } = useCart();
    const pathname = usePathname();

    if (!isOpen || pathname.startsWith('/checkout')) return null;

    return (
        <aside className="floating-cart">
            {cart.items.map((item) => (
                <div key={item.id}>
                    {item.title} × {item.amount}
                </div>
            ))}
            <button onClick={toggleCart}>Close</button>
        </aside>
    );
}
