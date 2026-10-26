import 'server-only';

import { createQueryParam } from '@/utils/params';
import { Product, productsResponseSchema } from '../types/product';

interface GetProductsOptions {
    limit?: number;
    skip?: number;
}

export async function getProducts(
    params: GetProductsOptions = {},
): Promise<{ products: Product[]; total: number }> {
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

        const productResponse = productsResponseSchema.safeParse(data);

        if (productResponse.success) {
            return {
                products: productResponse.data.products,
                total: productResponse.data.total,
            };
        }

        throw new Error(productResponse.error?.message);
    } catch (error) {
        console.error(JSON.stringify(error));
    }

    return { products: [], total: 0 };
}
