import React from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'
import productService from '../../services/productService'

const CampusPulse = ({ featuredProduct }) => {
  // Collections data with Lumina colors
  const collections = [
    {
      title: "Tech",
      iconName: "laptop_mac",
      color: "text-indigo-400",
      bg: "bg-indigo-500/15",
      border: "border-indigo-500/20",
      count: "240+ Items"
    },
    {
      title: "Books",
      iconName: "menu_book",
      color: "text-violet-400",
      bg: "bg-violet-500/15",
      border: "border-violet-500/20",
      count: "1.2k+ Items"
    },
    {
      title: "Lifestyle",
      iconName: "chair",
      color: "text-cyan-400",
      bg: "bg-cyan-500/15",
      border: "border-cyan-500/20",
      count: "85+ Items"
    },
    {
      title: "Services",
      iconName: "design_services",
      color: "text-indigo-400",
      bg: "bg-indigo-500/15",
      border: "border-indigo-500/20",
      count: "42 active"
    }
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-start">
        {/* Left: Featured Spotlight Card with 3D Tilt */}
        <div className="lg:col-span-7 perspective-container">
          <div className="tilt-card glass-card-indigo rounded-3xl p-6 md:p-8 relative overflow-hidden group">
            {/* Ambient gradient border effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

            {/* Top right atmospheric bloom */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/15 blur-[100px] -mr-32 -mt-32 rounded-full"></div>
            {/* Bottom left secondary bloom */}
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/10 blur-[80px] -ml-24 -mb-24 rounded-full"></div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <div className="flex-1">
                <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/20 to-violet-500/20 text-indigo-300 font-bold text-xs uppercase tracking-wider mb-3 border border-indigo-500/30 backdrop-blur-sm">
                  Spotlight Item
                </span>
                <h3 className="font-headline text-2xl md:text-4xl font-extrabold mt-3 leading-tight gradient-text bg-gradient-to-r from-white via-indigo-100 to-cyan-100 bg-clip-text text-transparent">
                  {featuredProduct?.title || "No featured product available"}
                </h3>
                <p className="text-gray-400 mt-2 text-sm md:text-base font-medium">
                  {featuredProduct?.condition || "Condition not specified"} • {featuredProduct?.category || "Category"}
                </p>
              </div>
              <div className="text-right mt-4 md:mt-0">
                <div className="text-2xl md:text-3xl font-extrabold gradient-text bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  ₹{featuredProduct ? parseFloat(featuredProduct.price).toLocaleString('en-IN') : '0'}
                </div>
                {featuredProduct?.originalPrice && (
                  <div className="text-gray-500 text-sm line-through">
                    ₹{parseFloat(featuredProduct.originalPrice).toLocaleString('en-IN')}
                  </div>
                )}
              </div>
            </div>

            {/* Product Image */}
            <div className="relative z-10 aspect-[16/10] md:aspect-[18/10] rounded-2xl overflow-hidden mb-8 shadow-2xl group-hover:shadow-indigo-500/20 transition-shadow duration-500">
              {featuredProduct?.imageUrl ? (
                <img
                  src={productService.getFileView(featuredProduct.imageId)}
                  alt={`photo of ${featuredProduct.title}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-[#0C0C0C] flex items-center justify-center border border-indigo-500/20">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060E20]/90 via-transparent to-transparent"></div>
            </div>

            {/* Seller Info & CTA */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-[#0C0C0C] flex items-center justify-center text-indigo-400 border border-indigo-500/30 backdrop-blur-sm">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-200">
                    {featuredProduct?.sellerName || "Unknown Seller"}
                  </div>
                  <div className="text-xs text-gray-400">
                    {featuredProduct?.category || "General"}
                  </div>
                </div>
              </div>
              <Link
                to={featuredProduct ? `/product/${featuredProduct.id}` : '#'}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold hover:from-indigo-500 hover:to-violet-500 transition-all duration-300 shadow-[0_0_30px_-5px_rgba(99,102,241,0.5)] hover:shadow-[0_0_40px_-5px_rgba(139,92,246,0.6)] active:scale-95 cursor-pointer"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Curated Collections Grid with 3D Tile Cards */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4 md:gap-6">
          <div className="col-span-2 mb-2 md:mb-4">
            <h2 className="font-headline text-2xl md:text-3xl font-extrabold gradient-text bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              Curated Collections
            </h2>
            <p className="text-gray-400 text-sm md:text-base mt-1">Handpicked essentials for your major.</p>
          </div>

          {collections.map((collection, index) => (
            <div key={index} className="perspective-container group">
              <div className="tilt-card glass-card rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center text-center cursor-pointer relative overflow-hidden transition-all duration-300">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>

                {/* Hover border glow */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-indigo-500/50 transition-all duration-500"></div>

                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-3 md:mb-4 transition-all duration-300 group-hover:scale-110 ${collection.bg} border ${collection.border}`}>
                  <span className={`material-symbols-outlined text-3xl md:text-4xl ${collection.color}`}>
                    {collection.iconName}
                  </span>
                </div>
                <span className="font-headline font-bold text-lg">{collection.title}</span>
                <span className="text-xs text-gray-400 mt-1">{collection.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CampusPulse
