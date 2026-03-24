import Cart from '../Components/home/featuredproduct/ItemCard'
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useRef } from "react";
import { ProductGridSkeleton } from '../Components/SkeletonLoader';
import { fetchProducts, fetchMoreProducts } from '../store/productSlice';

const Browse = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);
  const pagination = useSelector((state) => state.products.pagination);
  const isLoadingMore = useSelector((state) => state.products.isLoadingMore);

  // Intersection Observer for infinite scroll
  const observerRef = useRef();
  const lastProductRef = useRef();

  useEffect(() => {
    if (isLoadingMore || !pagination.hasMore) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && pagination.hasMore && !isLoadingMore) {
        dispatch(fetchMoreProducts());
      }
    }, { threshold: 0.1 });

    if (lastProductRef.current) {
      observerRef.current.observe(lastProductRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [dispatch, isLoadingMore, pagination.hasMore]);

  // Initial fetch
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className='w-full flex flex-col items-center gap-6 mt-7 pb-12 animate-fadeIn bg-gray-50 dark:bg-gray-950 min-h-screen'>
      <div className='w-[90%] max-w-7xl'>
        <h1 className="font-bold text-3xl mb-2 text-gray-900 dark:text-white">Browse Products</h1>
        <p className="text-gray-600 dark:text-gray-400">Discover items from your campus community</p>
      </div>

      <div className='w-full flex justify-center'>
        <div className='mt-5 w-[90%] max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr'>
          {products.map((doc, index) => {
            const isLast = index === products.length - 1;
            return (
              <div
                key={doc.$id}
                ref={isLast ? lastProductRef : null}
                className="animate-fadeIn"
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
      </div>

      {isLoadingMore && (
        <div className='w-[90%] max-w-7xl py-8'>
          <ProductGridSkeleton count={8} />
        </div>
      )}

      {products.length > 0 && (
        <div className="text-center text-gray-600 dark:text-gray-400 text-sm animate-fadeIn">
          Loaded {products.length} of {pagination.total} products
          {pagination.hasMore && " • Scroll for more"}
        </div>
      )}

    </div>
  )
}

export default Browse;
