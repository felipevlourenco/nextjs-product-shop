import Header from '@/components/layout/Header';
import { CartProvider } from '../features/cart/CartProvider';
import CartSummary from '../features/cart/components/CartSummary';

export default function StoreLayout({ children }: LayoutProps<'/'>) {
    return (
        <CartProvider>
            <Header title="Store">
                <CartSummary />
            </Header>
            <main className="m-4">{children}</main>
            <footer>FOOTER</footer>
        </CartProvider>
    );
}
