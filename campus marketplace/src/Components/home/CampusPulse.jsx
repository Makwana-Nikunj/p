import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Package } from 'lucide-react'
import productService from '../../services/productService'

const CampusPulse = ({ trendingProducts }) => {
  const [imageErrors, setImageErrors] = useState({})

  const handleImageError = (productId) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }))
  }

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      {/* Section Header - Centered */}
      <div className="mb-8 md:mb-10 text-center">
        <h2 className="font-headline text-3xl md:text-4xl font-extrabold gradient-text bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
          Trending This Week
        </h2>
        <p className="text-gray-400 text-sm md:text-base mt-2 max-w-2xl mx-auto">
          Hot listings from your campus community
        </p>
      </div>

      {/* Products Grid - Flexbox centered */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-6xl mx-auto">
        {trendingProducts && trendingProducts.length > 0 ? (
          trendingProducts.map((product, index) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group block w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-0.75rem)]"
            >
              <div className="rounded-3xl overflow-hidden relative border border-indigo-500/10 hover:border-indigo-500/40 transition-all duration-500 shadow-[0_0_20px_-5px_rgba(99,102,241,0.3),0_8px_32px_-8px_rgba(0,0,0,0.4)] hover:shadow-[0_0_40px_-5px_rgba(99,102,241,0.5),0_0_60px_-10px_rgba(139,92,246,0.3),0_12px_40px_-8px_rgba(0,0,0,0.5)] backdrop-blur-xl bg-[#0C0C0C] group-hover:scale-[1.02] transition-transform duration-500">
                {/* Product Image */}
                <div className="aspect-[4/3] relative overflow-hidden rounded-t-3xl">
                  {product.imageId && !imageErrors[product.id] ? (
                    <img
                      src={productService.getFileView(product.imageId)}
                      alt={product.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={() => handleImageError(product.id)}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#0C0C0C] flex items-center justify-center">
                      <Package className="w-12 h-12 text-gray-500" />
                    </div>
                  )}
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 rounded-t-3xl bg-gradient-to-t from-[#060E20] via-transparent to-transparent opacity-60"></div>

                  {/* Status badge */}
                  {product.condition && (
                    <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-indigo-500/20 backdrop-blur-sm border border-indigo-500/30">
                      <span className="text-xs font-bold text-indigo-300">{product.condition}</span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4 md:p-5">
                  <h3 className="font-headline font-bold text-white text-base md:text-lg mb-2 line-clamp-2 leading-snug min-h-[3.5rem]">
                    {product.title}
                  </h3>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">
                      {product.category || 'General'}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-500 line-through">
                        ₹{parseFloat(product.originalPrice).toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="text-lg md:text-xl font-extrabold gradient-text bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                      ₹{parseFloat(product.price).toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-gray-400">
                      {product.sellerName?.split(' ')[0] || 'Seller'}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          // Empty state - 4 placeholder cards
          Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-0.75rem)]"
            >
              <div className="rounded-3xl overflow-hidden relative border border-indigo-500/10 shadow-[0_0_20px_-5px_rgba(99,102,241,0.3),0_8px_32px_-8px_rgba(0,0,0,0.4)] bg-[#0C0C0C] backdrop-blur-xl">
                <div className="aspect-[4/3] bg-[#0C0C0C] animate-pulse flex items-center justify-center rounded-t-3xl">
                  <Package className="w-12 h-12 text-gray-600" />
                </div>
                <div className="p-4 md:p-5">
                  <div className="h-4 bg-indigo-500/10 rounded mb-2 animate-pulse"></div>
                  <div className="h-3 bg-indigo-500/5 rounded w-2/3 mb-3 animate-pulse"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-5 bg-indigo-500/10 rounded w-1/3 animate-pulse"></div>
                    <div className="h-3 bg-indigo-500/5 rounded w-1/4 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default CampusPulse
