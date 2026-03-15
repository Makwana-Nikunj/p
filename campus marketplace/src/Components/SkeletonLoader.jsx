import React from 'react';

/**
 * Reusable skeleton loader component for better UX during data loading
 */

// Skeleton for product cards
export const ProductCardSkeleton = () => (
    <div className="w-full h-64 bg-gray-200 rounded-lg p-4 space-y-4 animate-pulse">
        <div className="w-full h-32 bg-gray-300 rounded-md"></div>
        <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
    </div>
);

// Skeleton for product grid
export const ProductGridSkeleton = ({ count = 12 }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        {Array.from({ length: count }).map((_, i) => (
            <ProductCardSkeleton key={i} />
        ))}
    </div>
);

// Skeleton for product detail page
export const ProductDetailSkeleton = () => (
    <div className="w-full space-y-6 animate-pulse">
        <div className="flex flex-col lg:flex-row gap-6">
            {/* Image skeleton */}
            <div className="w-full lg:w-1/2 h-96 bg-gray-300 rounded-lg"></div>

            {/* Details skeleton */}
            <div className="w-full lg:w-1/2 space-y-4">
                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
                <div className="flex gap-4 pt-4">
                    <div className="h-10 bg-gray-300 rounded flex-1"></div>
                    <div className="h-10 bg-gray-300 rounded flex-1"></div>
                </div>
            </div>
        </div>

        {/* Related products skeleton */}
        <div className="space-y-4">
            <div className="h-6 bg-gray-300 rounded w-1/4"></div>
            <ProductGridSkeleton count={4} />
        </div>
    </div>
);

// Skeleton for form inputs
export const FormFieldSkeleton = () => (
    <div className="space-y-2 animate-pulse">
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="h-10 bg-gray-300 rounded"></div>
    </div>
);

// Skeleton for chat/message
export const ChatMessageSkeleton = () => (
    <div className="space-y-4 animate-pulse">
        {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className={`h-12 ${i % 2 === 0 ? 'w-1/2' : 'w-1/3'} bg-gray-300 rounded-lg`}></div>
            </div>
        ))}
    </div>
);

// Skeleton for user profile
export const ProfileSkeleton = () => (
    <div className="w-full space-y-6 animate-pulse">
        <div className="flex items-center gap-4">
            <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
            <div className="space-y-2 flex-1">
                <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            </div>
        </div>

        <div className="space-y-4">
            <div className="h-6 bg-gray-300 rounded w-1/4"></div>
            <div className="space-y-2">
                <FormFieldSkeleton />
                <FormFieldSkeleton />
                <FormFieldSkeleton />
            </div>
        </div>
    </div>
);

// Generic skeleton line (customizable)
export const SkeletonLine = ({ width = 'w-3/4', height = 'h-4' }) => (
    <div className={`${width} ${height} bg-gray-300 rounded animate-pulse`}></div>
);

export default Object.freeze({
    ProductCardSkeleton,
    ProductGridSkeleton,
    ProductDetailSkeleton,
    FormFieldSkeleton,
    ChatMessageSkeleton,
    ProfileSkeleton,
    SkeletonLine,
});
