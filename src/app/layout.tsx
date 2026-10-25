import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { CartProvider } from './features/cart/context/CartProvider';
import './globals.css';

export const metadata: Metadata = {
    title: 'Tintora Shop',
};

export default function RootLayout({
    children,
    floatingCart,
}: LayoutProps<'/'> & { floatingCart: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <CartProvider>
                    {children}
                    {floatingCart}
                </CartProvider>
            </body>
        </html>
    );
}
