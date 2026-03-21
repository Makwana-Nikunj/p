import SearchBar from '../Components/browse/SearchBar'
import Cart from '../Components/home/featuredproduct/ItemCard'
import { useSelector } from "react-redux"
import productService from '../services/productService'
import { useState, useEffect } from "react";
import { ProductCardSkeleton, ProductGridSkeleton } from '../Components/SkeletonLoader';
import { useToast } from '../Components/Toast/ToastContainer';

const Browse = () => {

  const products = useSelector((state) => state.products.products);
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Simulate initial load or set to false if products are pre-loaded
    if (products && products.length > 0) {
      setIsLoading(false);
    } else {
      // Only show loading briefly if products are being fetched
      setTimeout(() => setIsLoading(false), 500);
    }
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

  return (
    <div className='w-full flex flex-col items-center gap-6 mt-7 pb-12'>

      {/* Heading */}
      <div className='w-[86%]'>
        <h1 className="font-semibold text-3xl mb-2 text-gray-900 dark:text-white">Browse Products</h1>
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
          <div className='w-[86%]'>
            <ProductGridSkeleton count={12} />
          </div>
        ) : filtered.length > 0 ? (
          // Products found
          <div className='mt-5 w-full flex justify-center items-center gap-4 flex-wrap px-4'>
            {filtered.map((doc) => (
              <Cart
                key={doc.$id}
                id={doc.$id}
                imgUrl={productService.getFileView(doc.imageId)}
                category={doc.category}
                name={doc.title}
                price={doc.price}
                views={doc.views}
                favoriteCount={doc.favoriteCount}
              />
            ))}
          </div>
        ) : (
          // Empty state
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <svg
              className="w-24 h-24 text-gray-300 dark:text-gray-700 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              role="img"
              aria-label="No products found"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
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
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Results summary */}
      {!isLoading && filtered.length > 0 && (
        <div className="text-center text-gray-600 dark:text-gray-400 text-sm">
          Showing <span className="font-semibold text-gray-800 dark:text-gray-200">{filtered.length}</span> products
        </div>
      )}

    </div>
  )
}

export default Browse;
