'use client';

import { useCart } from '@/app/features/cart/context/CartContext';
import { Product } from '@/app/features/products/types/product';
import { Button } from 'tintora';

interface AddToCartButtonProps {
    product: Product;
    fullWidth?: boolean;
}

export default function AddToCartButton({
    product,
    fullWidth = false,
}: AddToCartButtonProps) {
    const { addProduct } = useCart();

    const onClickHandler = () => addProduct(product);

    return (
        <Button
            variant="primary"
            onClick={onClickHandler}
            fullWidth={fullWidth}
        >
            Add to cart
        </Button>
    );
}
