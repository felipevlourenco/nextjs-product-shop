import { getProduct } from '@/app/features/products/api/getProduct';
import { getProducts } from '@/app/features/products/api/getProducts';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ViewTransition } from 'react';
import './page.css';

export async function generateStaticParams() {
    const products = await getProducts();
    return products.map((product) => ({ productId: String(product.id) }));
}

export default async function ProductDetail({
    params,
}: {
    params: Promise<{ productId: number }>;
}) {
    const { productId } = await params;
    const product = await getProduct(productId);

    if (!product) {
        notFound();
    }

    return (
        <div className="product">
            <ViewTransition name={`product-${product.id}`}>
                <Image
                    alt={product.title}
                    src={product.images[0]}
                    width={200}
                    height={200}
                    loading="eager"
                />
            </ViewTransition>
            <div className="product-deteils">
                <div>
                    <h1>{product.title}</h1>
                    <h3>€ {product.price}</h3>
                </div>
                <div>
                    <span>{product.rating}</span>
                    <span>{product.description}</span>
                </div>
                {/* <Button variant="primary">Add to cart</Button> */}
            </div>
        </div>
    );
}
