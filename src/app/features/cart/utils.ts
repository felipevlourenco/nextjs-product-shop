import { Product } from '../products/types/product';
import { CartItem } from './types/cart';

function priceToCents(price: number) {
    return price * 100;
}

export function formatPrice(total: number): string {
    return (total / 100).toFixed(2);
}

export function calculateTotalPrice(items: CartItem[]) {
    return items.reduce((acc, item) => {
        return acc + priceToCents(item.price) * item.amount;
    }, 0);
}

export function mapProductToCart(product: Product): CartItem {
    return {
        id: product.id,
        title: product.title,
        amount: 1,
        images: product.images,
        price: product.price,
        stock: product.stock,
    };
}
