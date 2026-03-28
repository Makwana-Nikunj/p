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
  <div className="w-full animate-pulse">
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Image skeleton - glass card with rounded corners */}
      <div className="w-full lg:w-1/2">
        <div className="aspect-[4/3] rounded-[2.5rem] bg-surface-container-high border border-white/10 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent"></div>
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-surface-bright/30 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Details skeleton */}
      <div className="w-full lg:w-1/2 space-y-6">
        {/* Title skeleton */}
        <div className="space-y-4">
          <div className="h-12 bg-surface-container-high glass rounded-2xl w-3/4"></div>
          <div className="h-10 bg-surface-container-high glass rounded-2xl w-1/3"></div>
        </div>

        {/* Specs grid skeleton */}
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-5 rounded-3xl bg-surface-container-high border border-white/5">
              <div className="h-4 bg-surface-bright/30 rounded w-16 mb-3"></div>
              <div className="h-6 bg-surface-bright/30 rounded w-24"></div>
            </div>
          ))}
        </div>

        {/* Description skeleton */}
        <div className="space-y-3 pt-4">
          <div className="h-5 bg-surface-container-high glass rounded w-1/4"></div>
          <div className="h-4 bg-surface-container-high glass rounded w-full"></div>
          <div className="h-4 bg-surface-container-high glass rounded w-full"></div>
          <div className="h-4 bg-surface-container-high glass rounded w-3/4"></div>
        </div>

        {/* Seller card skeleton */}
        <div className="pt-6">
          <div className="p-8 rounded-[2.5rem] bg-surface-container-highest border border-white/10 shadow-2xl">
            <div className="h-6 bg-surface-bright/30 rounded w-1/3 mb-6"></div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-surface-bright/30 border-2 border-primary/20"></div>
              <div className="space-y-2 flex-1">
                <div className="h-6 bg-surface-bright/30 rounded w-32"></div>
                <div className="h-4 bg-surface-bright/30 rounded w-24"></div>
              </div>
            </div>
            <div className="h-14 bg-surface-container-high glass rounded-2xl"></div>
          </div>
        </div>
      </div>
    </div>

    {/* Related products skeleton */}
    <div className="space-y-6 pt-12 mt-32">
      <div className="h-10 bg-surface-container-high glass rounded-2xl w-48"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="tilt-card rounded-2xl overflow-hidden bg-surface-container-low border border-white/5">
            <div className="aspect-square bg-surface-container-high flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-surface-bright/30 animate-pulse"></div>
            </div>
            <div className="p-5 space-y-3">
              <div className="h-4 bg-surface-bright/30 rounded w-16"></div>
              <div className="h-5 bg-surface-bright/30 rounded w-3/4"></div>
              <div className="h-6 bg-surface-bright/30 rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>
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