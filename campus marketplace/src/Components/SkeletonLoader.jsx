import React from 'react';

/**
 * Reusable skeleton loader component for better UX during data loading
 */

// Skeleton for product cards
export const ProductCardSkeleton = () => (
    <div className="w-full rounded-2xl overflow-hidden skeleton">
        {/* Image area */}
        <div className="w-full h-48 bg-gray-200 dark:bg-gray-800"></div>

        {/* Content area */}
        <div className="p-4 space-y-3">
            {/* Category badge */}
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>

            {/* Title */}
            <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>

            {/* Price */}
            <div className="flex items-center justify-between">
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-12"></div>
            </div>
        </div>
    </div>
);

// Skeleton for product grid with stagger
export const ProductGridSkeleton = ({ count = 12 }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {Array.from({ length: count }).map((_, i) => (
            <div
                key={i}
                className="opacity-0 animate-slideInFromBottom"
                style={{ animationDelay: `${i * 0.05}s`, animationFillMode: 'forwards' }}
            >
                <ProductCardSkeleton />
            </div>
        ))}
    </div>
);

// Skeleton for product detail page
export const ProductDetailSkeleton = () => (
    <div className="w-full space-y-6 animate-pulse">
        <div className="flex flex-col lg:flex-row gap-6">
            {/* Image skeleton */}
            <div className="w-full lg:w-1/2 h-96 bg-gray-300 dark:bg-gray-800 rounded-xl"></div>

            {/* Details skeleton */}
            <div className="w-full lg:w-1/2 space-y-4">
                <div className="flex gap-4 items-start">
                    <div className="h-8 bg-gray-300 dark:bg-gray-800 rounded flex-1 w-3/4"></div>
                    <div className="h-8 bg-gray-300 dark:bg-gray-800 rounded w-24"></div>
                </div>
                <div className="h-8 bg-gray-300 dark:bg-gray-800 rounded w-1/3"></div>
                <div className="space-y-3 pt-4">
                    <div className="h-5 bg-gray-300 dark:bg-gray-800 rounded w-1/2"></div>
                    <div className="h-5 bg-gray-300 dark:bg-gray-800 rounded w-1/2"></div>
                    <div className="h-5 bg-gray-300 dark:bg-gray-800 rounded w-1/3"></div>
                </div>
                <div className="space-y-2 pt-4">
                    <div className="h-4 bg-gray-300 dark:bg-gray-800 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-800 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-800 rounded w-3/4"></div>
                </div>
                <div className="pt-6">
                    <div className="h-24 bg-gray-300 dark:bg-gray-800 rounded-xl"></div>
                </div>
            </div>
        </div>

        {/* Related products skeleton */}
        <div className="space-y-4 pt-8">
            <div className="h-8 bg-gray-300 dark:bg-gray-800 rounded w-48"></div>
            <ProductGridSkeleton count={4} />
        </div>
    </div>
);

// Skeleton for form inputs
export const FormFieldSkeleton = () => (
    <div className="space-y-2 animate-pulse">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
        <div className="h-12 bg-gray-300 dark:bg-gray-800 rounded-lg"></div>
    </div>
);

// Skeleton for chat/message
export const ChatMessageSkeleton = () => (
    <div className="space-y-4 animate-pulse">
        {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className={`h-12 ${i % 2 === 0 ? 'w-1/2' : 'w-1/3'} bg-gray-300 dark:bg-gray-800 rounded-2xl`}></div>
            </div>
        ))}
    </div>
);

// Skeleton for user profile
export const ProfileSkeleton = () => (
    <div className="w-full space-y-6 animate-pulse">
        <div className="flex items-center gap-4">
            <div className="w-24 h-24 bg-gray-300 dark:bg-gray-800 rounded-full"></div>
            <div className="space-y-2 flex-1">
                <div className="h-6 bg-gray-300 dark:bg-gray-800 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-800 rounded w-1/3"></div>
            </div>
        </div>

        <div className="space-y-4">
            <div className="h-6 bg-gray-300 dark:bg-gray-800 rounded w-1/4"></div>
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
    <div className={`${width} ${height} bg-gray-300 dark:bg-gray-800 rounded skeleton`}></div>
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