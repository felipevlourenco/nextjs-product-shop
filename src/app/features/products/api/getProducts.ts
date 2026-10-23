import { Product, productListSchema } from '../types/product';

export async function getProducts(): Promise<Product[]> {
    const url = process.env.API_URL;

    if (!url) {
        throw new Error('API URL must be defined!');
    }

    const controller = new AbortController();

    try {
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
            throw new Error('Failed to get products!');
        }

        const data = await response.json();

        const productResponse = productListSchema.safeParse(data.products);

        if (productResponse.success) {
            return productResponse.data;
        } else {
            throw new Error(productResponse.error.message);
        }
    } catch (error) {
        console.error(JSON.stringify(error));
    }

    return [];
}
