'use client';

import { ReactNode, useMemo, useReducer, useState } from 'react';
import { Product } from '../../products/types/product';
import { Cart, CartItem } from '../types/cart';
import { calculateTotalPrice, mapProductToCart } from '../utils';
import { CartContext } from './CartContext';

type CartState = Cart;

interface CartAction {
    action: 'add' | 'remove';
    payload: CartItem;
}

function reducer(state: CartState, action: CartAction) {
    if (action.action === 'add') {
        const existingItem = state.items.find(
            (item) => item.id === action.payload.id,
        );

        if (existingItem) {
            existingItem.amount++;
        }

        const items = existingItem
            ? state.items.map((item) =>
                  item.id === action.payload.id ? existingItem : item,
              )
            : [...state.items, action.payload];

        return {
            ...state,
            items: items,
            total: calculateTotalPrice(items),
        };
    } else if (action.action === 'remove') {
        const index = state.items.findIndex(
            (item) => item.id === action.payload.id,
        );

        if (index === -1) {
            return state;
        }

        const item = state.items[index];
        const items =
            item.amount > 1
                ? state.items.map((current, i) =>
                      i === index
                          ? { ...current, amount: current.amount - 1 }
                          : current,
                  )
                : state.items.toSpliced(index, 1);

        return {
            ...state,
            items,
            total: calculateTotalPrice(items),
        };
    }

    throw Error('Unknown action.');
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [state, dispatch] = useReducer(reducer, { items: [], total: 0 });

    const toggleCart = () => {
        setIsCartOpen((previousIsOpen) => !previousIsOpen);
    };
    const addProduct = (product: Product) =>
        dispatch({ action: 'add', payload: mapProductToCart(product) });
    const removeProduct = (item: CartItem) =>
        dispatch({ action: 'remove', payload: item });

    const value = useMemo(
        () => ({
            cart: state,
            isOpen: isCartOpen,
            toggleCart,
            addProduct,
            removeProduct,
        }),
        [isCartOpen, state],
    );

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}
