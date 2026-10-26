import { getProducts } from '@/app/features/products/api/getProducts';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const skip = +(request.nextUrl.searchParams.get('skip') ?? 0);

    if (!Number.isInteger(skip)) {
        return NextResponse.json(
            { error: 'Invalid skip value' },
            { status: 400 },
        );
    }

    try {
        const data = await getProducts({ skip });

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: `Failed to fetch products: ${JSON.stringify(error)}` },
            { status: 502 },
        );
    }
}
