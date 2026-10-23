'use client';

import { createContext, useContext } from 'react';
import { Product } from '../products/types/product';
import { type Cart } from './types/cart';

interface CartContextState {
    cart: Cart;
    addProduct: (product: Product) => void;
    removeProduct: (product: Product) => void;
}

export const CartContext = createContext<CartContextState | null>(null);

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCart should be used inside CartProvider');
    }

    return context;
}
