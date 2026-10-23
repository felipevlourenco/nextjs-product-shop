export default function StoreLayout({ children }: LayoutProps<'/checkout'>) {
    return (
        <>
            <header>CHECKOUT HEADER</header>
            <main>{children}</main>
            <footer>FOOTER</footer>
        </>
    );
}
