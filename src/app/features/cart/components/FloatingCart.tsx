'use client';

import { usePathname } from 'next/navigation';
import { Drawer } from 'tintora';
import { useCart } from '../context/CartContext';
import './FloatingCart.css';

export default function FloatingCart() {
    const { cart, isOpen, toggleCart } = useCart();
    const pathname = usePathname();

    if (pathname.startsWith('/checkout')) {
        return null;
    }

    return (
        <Drawer onClose={toggleCart} open={isOpen}>
            {cart.items.map((item) => (
                <div key={item.id}>
                    {item.title} × {item.amount}
                </div>
            ))}
            <button onClick={toggleCart}>Close</button>
        </Drawer>
    );
}
