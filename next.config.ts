import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    experimental: {
        agentFeedback: true,
    },
    cacheComponents: true,
    partialPrefetching: true,
    images: {
        remotePatterns: [
            new URL('https://cdn.dummyjson.com/product-images/**'),
        ],
    },
    turbopack: {
        rules: {
            '*.css': {
                loaders: ['@tailwindcss/turbopack'],
                as: '*.css',
            },
        },
    },
};

export default nextConfig;
