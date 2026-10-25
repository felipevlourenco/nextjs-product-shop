import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import CartSummary from '../features/cart/components/CartSummary';
import './layout.css';

export default function StoreLayout({ children }: LayoutProps<'/'>) {
    return (
        <>
            <Header title="Store">
                <CartSummary />
            </Header>
            <main className="main">{children}</main>
            <Footer />
        </>
    );
}
