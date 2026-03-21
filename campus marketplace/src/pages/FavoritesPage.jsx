import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import favoriteService from '../services/favoriteService';
import productService from '../services/productService';
import LoadingSpinner from '../Components/LoadingSpinner';
import Cart from '../Components/home/featuredproduct/ItemCard';

const Favorites = () => {
  const user = useSelector((state) => state.auth.userData);
  const products = useSelector((state) => state.products.products);

  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const favoriteProducts = products.filter(p =>
    favoriteIds.includes(p.$id) && p.status === 'approved' // FIX: Change 'active' to 'approved'
  );

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

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="w-full flex flex-col items-center gap-6 mt-7 min-h-[70vh]">
      <div className="w-[86%]">
        <h1 className="font-semibold text-2xl mb-2 dark:text-white">My Favorites ❤️</h1>
        <p className="text-gray-700 dark:text-gray-300">
          {favoriteProducts.length} {favoriteProducts.length === 1 ? 'item' : 'items'} saved
        </p>
      </div>

      <div className="w-full">
        {favoriteProducts.length > 0 ? (
          <div className="mt-5 w-full flex justify-center items-center gap-4 flex-wrap">
            {favoriteProducts.map((product) => (
              <Cart
                key={product.$id}
                id={product.$id}
                imgUrl={productService.getFileView(product.imageId)}
                category={product.category}
                name={product.title}
                price={product.price}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <svg className="w-24 h-24 text-gray-300 dark:text-gray-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
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
