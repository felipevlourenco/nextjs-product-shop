import Footer from '@/components/layout/Footer';
import './layout.css';

export default function StoreLayout({ children }: LayoutProps<'/checkout'>) {
    return (
        <>
            <header>CHECKOUT HEADER</header>
            <main className="main">{children}</main>
            <Footer />
        </>
    );
}
