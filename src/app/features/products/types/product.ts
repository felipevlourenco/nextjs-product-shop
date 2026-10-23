import { z } from 'zod';

const dimensionsSchema = z.object({
    width: z.number(),
    height: z.number(),
    depth: z.number(),
});

const reviewSchema = z.object({
    rating: z.number(),
    comment: z.string(),
    date: z.coerce.date(),
    reviewerName: z.string(),
    reviewerEmail: z.string(),
});

const metaSchema = z.object({
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    barcode: z.string(),
    qrCode: z.string(),
});

export const productSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    category: z.string(),
    price: z.number(),
    discountPercentage: z.number(),
    rating: z.number(),
    stock: z.number(),
    tags: z.array(z.string()),
    brand: z.string().optional(),
    sku: z.string(),
    weight: z.number(),
    dimensions: dimensionsSchema,
    warrantyInformation: z.string(),
    shippingInformation: z.string(),
    availabilityStatus: z.string(),
    reviews: z.array(reviewSchema),
    returnPolicy: z.string(),
    minimumOrderQuantity: z.number(),
    meta: metaSchema,
    thumbnail: z.string(),
    images: z.array(z.string()),
});

export const productListSchema = z.array(productSchema);

export type Product = z.infer<typeof productSchema>;
