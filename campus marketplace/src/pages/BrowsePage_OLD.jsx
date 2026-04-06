import SearchBar from '../Components/browse/SearchBar'
import Cart from '../Components/home/featuredproduct/ItemCard'
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useRef, useState, useCallback } from "react";
import { ProductCardSkeleton, ProductGridSkeleton } from '../Components/SkeletonLoader';
import { useToast } from '../Components/Toast/ToastContainer';
import { Package, SearchX } from 'lucide-react';
import {
  fetchProducts,
  fetchMoreProducts,
  resetProducts,
  setFilters
} from '../store/productSlice';

const Browse = () => {
  const dispatch = useDispatch();
  const { showToast } = useToast();

  // Redux state
  const products = useSelector((state) => state.products.products);
  const pagination = useSelector((state) => state.products.pagination);
  const isLoadingMore = useSelector((state) => state.products.isLoadingMore);
  const storedFilters = useSelector((state) => state.products.filters);

  // Local component state for UI filters (controlled inputs)
  const [search, setSearch] = useState(storedFilters.search);
  const [category, setCategory] = useState(storedFilters.category);
  const [sort, setSort] = useState(storedFilters.sort);
  const [minPrice, setMinPrice] = useState(storedFilters.minPrice);
  const [maxPrice, setMaxPrice] = useState(storedFilters.maxPrice);

  // Validate price inputs
  const handlePriceChange = (value, setter) => {
    if (value === '' || !isNaN(value)) {
      setter(value);
    } else {
      showToast('Please enter a valid price', 'warning', 2000);
    }
  };

  // Intersection Observer for infinite scroll
  const observerRef = useRef();
  const lastProductRef = useRef();

  const handleObserver = useCallback((node) => {
    if (isLoadingMore || !pagination.hasMore) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && pagination.hasMore && !isLoadingMore) {
        dispatch(fetchMoreProducts());
      }
    }, { threshold: 0.1 });

    if (node) observerRef.current.observe(node);
  }, [dispatch, isLoadingMore, pagination.hasMore]);

  // Initial data fetch on mount
  useEffect(() => {
    dispatch(fetchProducts({
      search: storedFilters.search,
      category: storedFilters.category,
      minPrice: storedFilters.minPrice,
      maxPrice: storedFilters.maxPrice,
      sort: storedFilters.sort
    }));
  }, [dispatch]); // Only on mount

  // Handle filter changes with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      const filters = { search, category, sort, minPrice, maxPrice };
      // If any filter changed from stored, update Redux filters, reset products, and fetch
      if (
        filters.search !== storedFilters.search ||
        filters.category !== storedFilters.category ||
        filters.sort !== storedFilters.sort ||
        filters.minPrice !== storedFilters.minPrice ||
        filters.maxPrice !== storedFilters.maxPrice
      ) {
        dispatch(setFilters(filters));
        dispatch(resetProducts());
        dispatch(fetchProducts(filters));
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search, category, sort, minPrice, maxPrice, dispatch, storedFilters]);

  // Stagger animation classes
  const staggerClasses = ['stagger-1', 'stagger-2', 'stagger-3', 'stagger-4', 'stagger-5', 'stagger-6'];

  // Calculate total count for summary
  const totalProducts = pagination.total || products.length;

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
        {products.length === 0 && !isLoadingMore ? (
          // Empty state
          <div className="flex flex-col items-center justify-center py-20 px-4 animate-fadeIn">
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
              {search || category !== "all" || minPrice || maxPrice ? (
                <SearchX className="w-12 h-12 dark:text-gray-400 text-gray-600" />
              ) : (
                <Package className="w-12 h-12 dark:text-gray-400 text-gray-600" />
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
        ) : (
          // Products grid
          <div className='mt-5 w-[90%] max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr'>
            {products.map((doc, index) => {
              const isLast = index === products.length - 1;
              const staggerClass = staggerClasses[index % 6];
              return (
                <div
                  key={doc.$id}
                  ref={isLast ? lastProductRef : null}
                  className={`opacity-0 animate-slideInFromBottom ${staggerClass}`}
                  style={{ animationFillMode: 'forwards' }}
                >
                  <Cart
                    id={doc.$id}
                    imgUrl={doc.imageId}
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
              );
            })}
          </div>
        )}
      </div>

      {/* Loading more indicator */}
      {isLoadingMore && (
        <div className='w-[90%] max-w-7xl py-8'>
          <ProductGridSkeleton count={8} />
        </div>
      )}

      {/* Results summary */}
      {products.length > 0 && (
        <div className="text-center text-gray-600 dark:text-gray-400 text-sm animate-fadeIn">
          Showing <span className="font-semibold text-gray-800 dark:text-gray-200">{products.length}</span> of{' '}
          <span className="font-semibold text-gray-800 dark:text-gray-200">{totalProducts}</span> products
          {pagination.hasMore && " • Scroll to load more"}
        </div>
      )}

    </div>
  )
}

export default Browse;