import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import favoriteService from '../services/favoriteService';
import productService from '../services/productService';
import { Skeleton } from "boneyard-js/react";
import Cart from '../Components/home/featuredproduct/ItemCard';
import { FaHeart } from 'react-icons/fa';
import AtmosphericBlooms from '../Components/AtmosphericBlooms';

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
        <h2 className="text-2xl font-bold mb-4 text-on-surface">Please login to view your favorites</h2>
        <Link to="/" className="px-6 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200">
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center gap-6 relative py-10">
      <AtmosphericBlooms intensity="subtle" />

      {loading ? (
        <div className="w-[90%] max-w-7xl animate-fadeIn">
          <Skeleton name="favorites-grid" loading={true}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="h-8 glass rounded w-48"></div>
                <div className="h-10 glass rounded w-32"></div>
              </div>
              <div className="h-5 glass rounded w-64 mb-6"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="w-full rounded-2xl overflow-hidden bg-surface-container-low dark:border-white/5 border-gray-200">
                    <div className="aspect-square bg-surface-container-high"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-3 bg-surface-bright/30 rounded w-16"></div>
                      <div className="h-5 bg-surface-bright/30 rounded w-3/4"></div>
                      <div className="h-6 bg-surface-bright/30 rounded w-20"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Skeleton>
        </div>
      ) : (
        <div className="w-[90%] max-w-7xl section-spacing">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
            <h1 className="font-section-headline gradient-text">My Favorites ❤️</h1>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 glass rounded-lg text-sm border border-subtle focus-glow-indigo transition-all duration-300 text-text-onSurface"
            >
              <option value="recent" className="text-gray-900">Recently saved</option>
              <option value="price-low" className="text-gray-900">Price: Low to High</option>
              <option value="price-high" className="text-gray-900">Price: High to Low</option>
            </select>
          </div>
          <p className="text-on-surface-variant">
            {favoriteProducts.length} {favoriteProducts.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>
      )}

      <div className="w-full flex justify-center">
        {sortedFavorites.length > 0 ? (
          <div className='w-[90%] max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr'>
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
          <div className="flex flex-col items-center justify-center py-16 section-spacing w-[90%] max-w-7xl">
            <div className="glass rounded-full p-8 mb-6 border border-subtle">
              <FaHeart className="w-24 h-24 text-on-surface-variant/50" />
            </div>
            <h3 className="font-section-headline gradient-text mb-2">No favorites yet</h3>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-6">
              Start adding products to your wishlist by clicking the heart icon
            </p>
            <Link to="/browse" className="btn-gradient-primary px-8 py-3 rounded-lg font-semibold shadow-lg">
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;