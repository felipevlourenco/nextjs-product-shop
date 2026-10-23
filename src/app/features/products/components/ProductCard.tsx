'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button, Card } from 'tintora';
import { useCart } from '../../cart/context/CartContext';
import { Product } from '../types/product';

export default function ProductCard({
    product,
    eager = false,
}: {
    product: Product;
    eager?: boolean;
}) {
    const { addProduct } = useCart();

    const onAddHandler = () => {
        addProduct(product);
    };

    return (
        <Card
            title={product.title}
            style={{
                flexDirection: 'column',
                alignItems: 'stretch',
                gap: 14,
                padding: '16px 18px 18px',
            }}
        >
            <Link href={`/${product.id}`}>
                <Image
                    alt={product.title}
                    src={product.images[0]}
                    width={100}
                    height={100}
                    loading={eager ? 'eager' : 'lazy'}
                />
                <h3
                    style={{
                        margin: 0,
                        font: 'var(--tintora-font-label)',
                    }}
                >
                    {product.title}
                </h3>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: 4,
                    }}
                >
                    <span
                        style={{
                            font: 'var(--tintora-font-stat-value)',
                            color: 'var(--tintora-color-accent-deep)',
                        }}
                    >
                        € {product.price}
                    </span>
                </div>
            </Link>
            <Button variant="primary" onClick={onAddHandler}>
                Add to cart
            </Button>
        </Card>
    );
}
