import { getProducts } from '../features/products/api/getProducts';
import ProductList from '../features/products/components/ProductList';

export default async function Store() {
    const products = await getProducts();
    return <ProductList products={products} />;
}
