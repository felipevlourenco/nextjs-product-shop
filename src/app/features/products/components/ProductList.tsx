'use client';

import { useState } from 'react';
import { Spinner } from 'tintora';
import { Product } from '../types/product';
import Observer from './Observer';
import ProductCard from './ProductCard';
import './ProductList.css';

export default function ProductList({
    products: initialProducts,
    totalProducts,
}: {
    products: Product[];
    totalProducts: number;
}) {
    const [products, setProducts] = useState(initialProducts);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(
        initialProducts.length < totalProducts,
    );

    const handleCallback = async ([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting && hasMore) {
            setIsLoading(true);

            const response = await fetch(
                `/api/products?skip=${products.length}`,
            );

            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }

            const nextProducts = await response.json();

            setHasMore(
                products.length + nextProducts.products.length < totalProducts,
            );
            setProducts((previousProducts) => [
                ...previousProducts,
                ...nextProducts.products,
            ]);

            setIsLoading(false);
        }
    };

    return (
        <ul className="product-list">
            {products.map((product, index) => (
                <li key={product.id}>
                    <ProductCard product={product} eager={index === 0} />
                </li>
            ))}
            {isLoading && <Spinner size="large" />}
            <Observer as="li" callback={handleCallback} />
        </ul>
    );
}
