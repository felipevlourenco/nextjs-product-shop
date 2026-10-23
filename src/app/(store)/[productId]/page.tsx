import { getProduct } from '@/app/features/products/api/getProduct';

export default async function ProductDetail({
    params,
}: {
    params: Promise<{ productId: number }>;
}) {
    const { productId } = await params;
    const product = await getProduct(productId);

    console.log('<========================================');
    console.log(product);
    console.log('========================================>');
    return <h1>{product?.title}</h1>;
}
