'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ViewTransition } from 'react';
import { Button, Card } from 'tintora';
import { useCart } from '../../cart/context/CartContext';
import { Product } from '../types/product';
import './ProductCard.css';

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
        <Card title={product.title} className="product-card">
            <Link href={`/${product.id}`}>
                <ViewTransition name={`product-${product.id}`}>
                    <Image
                        alt={product.title}
                        src={product.images[0]}
                        width={100}
                        height={100}
                        loading={eager ? 'eager' : 'lazy'}
                    />
                </ViewTransition>
                <h3 className="product-card__title">{product.title}</h3>
                <div className="product-card__price-wrapper">
                    <span className="product-card__price-label">
                        € {product.price}
                    </span>
                </div>
            </Link>
            <Button variant="primary" onClick={onAddHandler} fullWidth>
                Add to cart
            </Button>
        </Card>
    );
}
