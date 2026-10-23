import { Product } from '../types/product';
import ProductCard from './ProductCard';
import './ProductList.css';

export default async function ProductList({
    products,
}: {
    products: Product[];
}) {
    return (
        <ul className="product-list">
            {products.map((product, index) => (
                <li key={product.id}>
                    <ProductCard product={product} eager={index === 0} />
                </li>
            ))}
        </ul>
    );
}
