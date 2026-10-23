import Header from '@/components/layout/Header';
import CartSummary from '../features/cart/components/CartSummary';

export default function StoreLayout({ children }: LayoutProps<'/'>) {
    return (
        <>
            <Header title="Store">
                <CartSummary />
            </Header>
            <main className="m-4">{children}</main>
            <footer>FOOTER</footer>
        </>
    );
}
