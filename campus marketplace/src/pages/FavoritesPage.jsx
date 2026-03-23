import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import favoriteService from '../services/favoriteService';
import productService from '../services/productService';
import { ProductGridSkeleton } from '../Components/SkeletonLoader';
import Cart from '../Components/home/featuredproduct/ItemCard';
import { FaHeart } from 'react-icons/fa';

const Favorites = () => {
  const user = useSelector((state) => state.auth.userData);
  const products = useSelector((state) => state.products.products);

  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("recent");

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const favs = await favoriteService.getUserFavorites(user.$id);
        setFavoriteIds(favs.documents.map(f => f.productId));
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  let favoriteProducts = products.filter(p =>
    favoriteIds.includes(p.$id) && p.status === 'approved'
  );

  // Sort favorites
  const sortedFavorites = [...favoriteProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    // "recent" - sort by newest (by $createdAt)
    return new Date(b.$createdAt) - new Date(a.$createdAt);
  });

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Please login to view your favorites</h2>
        <Link to="/" className="px-6 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200">
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-6 mt-7 min-h-[70vh] bg-gray-50 dark:bg-gray-950 pb-12">
      {loading && (
        <div className="w-[90%] max-w-7xl animate-fadeIn">
          <div className="flex items-center justify-between mb-2">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
            <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
          </div>
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-64 animate-pulse mb-6"></div>
          <ProductGridSkeleton count={8} />
        </div>
      )}
      <div className="w-[90%] max-w-7xl">
        <div className="flex items-center justify-between mb-2">
          <h1 className="font-semibold text-2xl dark:text-white">My Favorites ❤️</h1>
          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg text-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="recent">Recently saved</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
        <p className="text-gray-700 dark:text-gray-300">
          {favoriteProducts.length} {favoriteProducts.length === 1 ? 'item' : 'items'} saved
        </p>
      </div>

      <div className="w-full flex justify-center">
        {sortedFavorites.length > 0 ? (
          <div className='w-[90%] max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {sortedFavorites.map((product) => (
              <Cart
                key={product.$id}
                id={product.$id}
                imgUrl={productService.getFileView(product.imageId)}
                category={product.category}
                name={product.title}
                price={product.price}
                condition={product.condition}
                sellerName={product.sellerName}
                sellerAvatar={product.sellerAvatar}
                rating={product.rating}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <FaHeart className="w-24 h-24 text-gray-300 dark:text-gray-700 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No favorites yet</h3>
            <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-4">
              Start adding products to your wishlist by clicking the heart icon
            </p>
            <Link to="/browse" className="px-6 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200">
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;