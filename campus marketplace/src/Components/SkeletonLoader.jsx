import React from 'react';

/**
 * Reusable skeleton loader component for better UX during data loading.
 * Lumina theme: glassmorphic shimmer on dark surfaces with staggered entry animations.
 */

// Shared skeleton base class
const base = 'animate-pulse-skeleton';
const glow = 'bg-[rgba(255,255,255,0.06)]';
const line = (w = 'w-3/4', h = 'h-4') => `${base} ${glow} rounded ${w} ${h}`;
const block = (...cls) => `${base} ${glow} rounded ${cls.join(' ')}`;

// ── Product Card ──
export const ProductCardSkeleton = () => (
  <div className="w-full rounded-2xl overflow-hidden dark:border-white/5 border-gray-200 bg-surface-container-highest">
    {/* Image area */}
    <div className={`w-full h-48 ${block('')}`}></div>
    {/* Content */}
    <div className="p-4 space-y-3">
      <div className={`rounded-full h-3 w-16 ${block('')}`}></div>
      <div className={`h-5 rounded w-3/4 ${block('')}`}></div>
      <div className="flex items-center justify-between">
        <div className={`rounded-full h-6 w-20 ${block('')}`}></div>
        <div className={`h-4 rounded w-12 ${block('')}`}></div>
      </div>
    </div>
  </div>
);

// ── Product Grid with stagger ──
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

// ── Product Detail ──
export const ProductDetailSkeleton = () => (
  <div className="w-full">
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Image */}
      <div className="w-full lg:w-1/2">
        <div className="aspect-[4/3] rounded-[2.5rem] bg-surface-container-high border dark:border-white/8 border-gray-300 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent"></div>
          <div className={`w-16 h-16 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${base}`}></div>
        </div>
      </div>

      {/* Details */}
      <div className="w-full lg:w-1/2 space-y-6">
        <div className="space-y-4">
          <div className={`h-12 rounded-2xl glass w-3/4 ${base}`}></div>
          <div className={`h-10 rounded-2xl glass w-1/3 ${base}`}></div>
        </div>

        {/* Specs grid */}
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`p-5 rounded-3xl dark:border-white/5 border-gray-200 ${base} bg-surface-container-high`}>
              <div className={`h-4 rounded w-16 mb-3 ${base}`}></div>
              <div className={`h-6 rounded w-24 ${base}`}></div>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="space-y-3 pt-4">
          <div className={`h-5 rounded glass w-1/4 ${base}`}></div>
          <div className={`h-4 rounded glass w-full ${base}`}></div>
          <div className={`h-4 rounded glass w-full ${base}`}></div>
          <div className={`h-4 rounded glass w-3/4 ${base}`}></div>
        </div>

        {/* Seller card */}
        <div className="pt-6">
          <div className={`p-8 rounded-[2.5rem] border dark:border-white/8 border-gray-300 shadow-2xl ${base} glass-intense`}>
            <div className={`h-6 rounded w-1/3 mb-6 ${base}`}></div>
            <div className="flex items-center gap-4 mb-8">
              <div className={`w-16 h-16 rounded-2xl border-2 border-primary/20 ${base}`}></div>
              <div className="space-y-2 flex-1">
                <div className={`h-6 rounded w-32 ${base}`}></div>
                <div className={`h-4 rounded w-24 ${base}`}></div>
              </div>
            </div>
            <div className={`h-14 rounded-2xl glass ${base}`}></div>
          </div>
        </div>
      </div>
    </div>

    {/* Related products */}
    <div className="space-y-6 pt-12 mt-32">
      <div className={`h-10 rounded-2xl glass w-48 ${base}`}></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="tilt-card rounded-2xl overflow-hidden dark:border-white/5 border-gray-200 bg-surface-container-low">
            <div className="aspect-square bg-surface-container-high flex items-center justify-center">
              <div className={`w-10 h-10 rounded-full ${base}`}></div>
            </div>
            <div className="p-5 space-y-3">
              <div className={`h-4 rounded w-16 ${base}`}></div>
              <div className={`h-5 rounded w-3/4 ${base}`}></div>
              <div className={`h-6 rounded w-20 ${base}`}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ── Form Field ──
export const FormFieldSkeleton = () => (
  <div className={`space-y-2 ${base}`}>
    <div className={`h-4 rounded w-1/4 ${base}`}></div>
    <div className={`h-12 rounded-lg ${base} bg-surface-container-highest border border-transparent`}></div>
  </div>
);

// ── Chat Message ──
export const ChatMessageSkeleton = () => (
  <div className={`space-y-4 ${base}`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
        <div className={`h-12 rounded-2xl glass ${i % 2 === 0 ? 'w-1/2' : 'w-1/3'} ${base}`}></div>
      </div>
    ))}
  </div>
);

// ── Profile ──
export const ProfileSkeleton = () => (
  <div className={`w-full space-y-6 ${base}`}>
    <div className="flex items-center gap-4">
      <div className={`w-24 h-24 rounded-full ${base} bg-surface-container-highest`}></div>
      <div className="space-y-2 flex-1">
        <div className={`h-6 rounded w-1/2 ${base}`}></div>
        <div className={`h-4 rounded w-1/3 ${base}`}></div>
      </div>
    </div>

    <div className="space-y-4">
      <div className={`h-6 rounded w-1/4 ${base}`}></div>
      <div className="space-y-2">
        <FormFieldSkeleton />
        <FormFieldSkeleton />
        <FormFieldSkeleton />
      </div>
    </div>
  </div>
);

// ── Generic Skeleton Line ──
const SkeletonLine = ({ width = 'w-3/4', height = 'h-4' }) => (
  <div className={`${line(width, height)}`}></div>
);

// ── Stat Card (for admin/dashboard) ──
export const StatCardSkeleton = () => (
  <div className={`p-6 rounded-2xl dark:border-white/5 border-gray-200 ${base} glass`}>
    <div className="flex items-center justify-between">
      <div className="space-y-3 flex-1">
        <div className={`h-4 rounded w-24 ${base}`}></div>
        <div className={`h-8 rounded w-16 ${base}`}></div>
      </div>
      <div className={`w-12 h-12 rounded-xl ${base}`}></div>
    </div>
  </div>
);

// ── Table Row (for admin tables) ──
export const TableRowSkeleton = () => (
  <div className={`flex items-center gap-4 p-4 rounded-xl dark:border-white/5 border-gray-200 ${base} bg-surface-container-high/50`}>
    <div className={`w-10 h-10 rounded-lg ${base} bg-surface-container-highest`}></div>
    <div className="flex-1 space-y-2">
      <div className={`h-4 rounded w-3/4 ${base}`}></div>
      <div className={`h-3 rounded w-1/2 ${base}`}></div>
    </div>
    <div className={`h-8 rounded-full px-4 ${base}`}></div>
    <div className="flex gap-2">
      <div className={`h-8 w-8 rounded-lg ${base}`}></div>
      <div className={`h-8 w-8 rounded-lg ${base}`}></div>
    </div>
  </div>
);

// ── Conversation Item (for chat sidebar) ──
export const ConversationItemSkeleton = () => (
  <div className={`p-4 rounded-2xl glass ${base}`}>
    <div className="flex items-start gap-4">
      <div className={`w-12 h-12 rounded-xl bg-surface-container-highest shrink-0 ${base}`}></div>
      <div className="flex-1 space-y-2">
        <div className={`h-4 rounded w-3/4 ${base}`}></div>
        <div className={`h-3 rounded w-1/2 ${base}`}></div>
      </div>
    </div>
  </div>
);

export default Object.freeze({
  ProductCardSkeleton,
  ProductGridSkeleton,
  ProductDetailSkeleton,
  FormFieldSkeleton,
  ChatMessageSkeleton,
  ProfileSkeleton,
  SkeletonLine,
  StatCardSkeleton,
  TableRowSkeleton,
  ConversationItemSkeleton,
});
