'use client';

import { ReactNode, useReducer } from 'react';
import { Product } from '../products/types/product';
import { CartContext } from './CartContext';
import { Cart, CartItem } from './types/cart';
import { calculateTotalPrice, mapProductToCart } from './utils';

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
        let items = [...state.items];

        if (item.amount > 1) {
            items = state.items.map((current, i) =>
                i === index
                    ? { ...current, amount: current.amount - 1 }
                    : current,
            );
        } else {
            items.toSpliced(index, 1);
        }

        return {
            ...state,
            items,
            total: calculateTotalPrice(items),
        };
    }

    throw Error('Unknown action.');
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, { items: [], total: 0 });

    const addProduct = (product: Product) =>
        dispatch({ action: 'add', payload: mapProductToCart(product) });
    const removeProduct = (product: Product) =>
        dispatch({ action: 'remove', payload: mapProductToCart(product) });

    return (
        <CartContext.Provider
            value={{
                cart: state,
                addProduct,
                removeProduct,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
