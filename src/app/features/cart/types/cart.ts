import { Product } from '../../products/types/product';

export type CartItem = Pick<
    Product,
    'id' | 'title' | 'images' | 'price' | 'stock'
> & {
    amount: number;
};

// All prices are store as cents
export interface Cart {
    items: CartItem[];
    total: number;
}
