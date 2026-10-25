'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Button, Card, IconButton, Drawer } from 'tintora';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils';
import './FloatingCart.css';

export default function FloatingCart() {
    const { cart, isOpen, toggleCart, removeProduct } = useCart();
    const pathname = usePathname();
    const router = useRouter();

    if (pathname.startsWith('/checkout')) {
        return null;
    }

    const goToCheckout = () => {
        toggleCart();
        router.push('/checkout');
    };

    return (
        <Drawer open={isOpen} onClose={toggleCart} width={360}>
            <div className="floating-cart">
                <div className="floating-cart__header">
                    <h2 className="floating-cart__title">Your cart</h2>
                    <IconButton
                        aria-label="Close cart"
                        icon="×"
                        size="small"
                        onClick={toggleCart}
                    />
                </div>

                {cart.items.length === 0 ? (
                    <p className="floating-cart__empty">Your cart is empty.</p>
                ) : (
                    <ul className="floating-cart__items">
                        {cart.items.map((item) => (
                            <li key={item.id}>
                                <Card
                                    as="div"
                                    variant="row"
                                    className="floating-cart__item"
                                >
                                    <Image
                                        alt={item.title}
                                        src={item.images[0]}
                                        width={48}
                                        height={48}
                                    />
                                    <div className="floating-cart__item-info">
                                        <span className="floating-cart__item-title">
                                            {item.title}
                                        </span>
                                        <span className="floating-cart__item-meta">
                                            {item.amount} × €{' '}
                                            {item.price.toFixed(2)}
                                        </span>
                                    </div>
                                    <IconButton
                                        aria-label={`Remove one ${item.title}`}
                                        icon="−"
                                        size="small"
                                        onClick={() => removeProduct(item)}
                                    />
                                </Card>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="floating-cart__footer">
                    <span className="floating-cart__total">
                        Total: € {formatPrice(cart.total)}
                    </span>
                    <Button
                        variant="primary"
                        fullWidth
                        disabled={cart.items.length === 0}
                        onClick={goToCheckout}
                    >
                        Go to checkout
                    </Button>
                </div>
            </div>
        </Drawer>
    );
}
