import SearchBar from '../Components/browse/SearchBar'
import Cart from '../Components/home/featuredproduct/ItemCard'
import { useSelector } from "react-redux"
import productService from '../services/productService'
import { useState, useEffect } from "react";
import { ProductCardSkeleton, ProductGridSkeleton } from '../Components/SkeletonLoader';
import { useToast } from '../Components/Toast/ToastContainer';
import { Package, SearchX } from 'lucide-react';

const Browse = () => {

  const products = useSelector((state) => state.products.products);
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wrap in a timeout to avoid synchronous setState inside an effect (React Compiler warning)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, products && products.length > 0 ? 0 : 500);

    return () => clearTimeout(timer);
  }, [products]);

  const activeProducts = products.filter(p => p.status === "approved" || p.status === "active")

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Validate price inputs
  const handlePriceChange = (value, setter) => {
    if (value === '' || !isNaN(value)) {
      setter(value);
    } else {
      showToast('Please enter a valid price', 'warning', 2000);
    }
  };

  // FILTER + SEARCH + SORT
  const filtered = activeProducts
    .filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter(item => {
      if (category === "all") return true;
      return item.category === category;
    })
    .filter(item => {
      const price = parseFloat(item.price);
      const min = minPrice ? parseFloat(minPrice) : 0;
      const max = maxPrice ? parseFloat(maxPrice) : Infinity;
      return price >= min && price <= max;
    })
    .sort((a, b) => {
      if (sort === "low-high") return a.price - b.price;
      if (sort === "high-low") return b.price - a.price;
      if (sort === "popular") return (b.views || 0) - (a.views || 0);
      if (sort === "favorites") return (b.favoriteCount || 0) - (a.favoriteCount || 0);
      return new Date(b.$createdAt) - new Date(a.$createdAt);
    });

  // Stagger animation classes
  const staggerClasses = ['stagger-1', 'stagger-2', 'stagger-3', 'stagger-4', 'stagger-5', 'stagger-6'];

  return (
    <div className='w-full flex flex-col items-center gap-6 mt-7 pb-12 animate-fadeIn bg-gray-50 dark:bg-gray-950 min-h-screen'>

      {/* Heading */}
      <div className='w-[90%] max-w-7xl'>
        <h1 className="font-bold text-3xl mb-2 text-gray-900 dark:text-white">Browse Products</h1>
        <p className="text-gray-600 dark:text-gray-400">Discover items from your campus community</p>
      </div>

      {/* Search & Filters */}
      <SearchBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
        minPrice={minPrice}
        setMinPrice={(value) => handlePriceChange(value, setMinPrice)}
        maxPrice={maxPrice}
        setMaxPrice={(value) => handlePriceChange(value, setMaxPrice)}
      />

      {/* Product List */}
      <div className='w-full flex justify-center'>
        {isLoading ? (
          // Loading skeleton
          <div className='w-[90%] max-w-7xl'>
            <ProductGridSkeleton count={12} />
          </div>
        ) : filtered.length > 0 ? (
          // Products found - Grid layout - 4 columns responsive with auto-fill
          <div className='mt-5 w-[90%] max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr'>
            {filtered.map((doc, index) => (
              <div
                key={doc.$id}
                className={`opacity-0 animate-slideInFromBottom ${staggerClasses[index % 6]}`}
                style={{ animationFillMode: 'forwards' }}
              >
                <Cart
                  id={doc.$id}
                  imgUrl={productService.getFileView(doc.imageId)}
                  category={doc.category}
                  name={doc.title}
                  price={doc.price}
                  views={doc.views}
                  favoriteCount={doc.favoriteCount}
                  condition={doc.condition}
                  sellerName={doc.sellerName}
                  sellerAvatar={doc.sellerAvatar}
                  rating={doc.rating}
                />
              </div>
            ))}
          </div>
        ) : (
          // Empty state
          <div className="flex flex-col items-center justify-center py-20 px-4 animate-fadeIn">
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
              {search || category !== "all" || minPrice || maxPrice ? (
                <SearchX className="w-12 h-12 text-gray-400" />
              ) : (
                <Package className="w-12 h-12 text-gray-400" />
              )}
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No products found</h3>
            <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
              {search || category !== "all" || minPrice || maxPrice
                ? "Try adjusting your filters, search terms, or price range"
                : "No products available at the moment. Be the first to list one!"
              }
            </p>
            {(search || category !== "all" || minPrice || maxPrice) && (
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("all");
                  setMinPrice("");
                  setMaxPrice("");
                  showToast('Filters cleared', 'info', 2000);
                }}
                className="px-6 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 btn-press"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Results summary */}
      {!isLoading && filtered.length > 0 && (
        <div className="text-center text-gray-600 dark:text-gray-400 text-sm animate-fadeIn">
          Showing <span className="font-semibold text-gray-800 dark:text-gray-200">{filtered.length}</span> {filtered.length === 1 ? 'product' : 'products'}
        </div>
      )}

    </div>
  )
}

export default Browse;