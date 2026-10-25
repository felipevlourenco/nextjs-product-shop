import { createQueryParam } from '@/utils/params';
import { Product, productListSchema } from '../types/product';

interface GetProductsOptions {
    limit?: number;
    skip?: number;
}

export async function getProducts(
    params: GetProductsOptions = {},
): Promise<Product[]> {
    const url = process.env.API_URL;

    if (!url) {
        throw new Error('API URL must be defined!');
    }

    const newParams = createQueryParam(params);

    const requestUrl =
        newParams.size > 0 ? `${url}?${newParams.toString()}` : url;

    try {
        const response = await fetch(requestUrl);

        if (!response.ok) {
            throw new Error('Failed to get products!');
        }

        const data = await response.json();

        const productResponse = productListSchema.safeParse(data.products);

        if (productResponse.success) {
            return productResponse.data;
        }

        throw new Error(productResponse.error.message);
    } catch (error) {
        console.error(JSON.stringify(error));
    }

    return [];
}
