import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import favoriteService from '../../../services/favoriteService';
import { Package } from 'lucide-react';

// Condition badge colors
const conditionColors = {
  "Like New": "bg-indigo-500",
  "Good": "bg-green-500",
  "Fair": "bg-amber-500",
};

const Cart = ({ imgUrl, name, category, price, id, views, favoriteCount, condition, sellerName, sellerAvatar, rating }) => {
  const user = useSelector((state) => state.auth.userData);
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      if (user && id) {
        const favorited = await favoriteService.isFavorited(user.$id, id);
        setIsFavorited(favorited);
      }
    };
    checkFavorite();
  }, [user, id]);

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      alert('Please login to add favorites');
      return;
    }

    if (loading) return;

    try {
      setLoading(true);
      setIsAnimating(true);

      if (isFavorited) {
        await favoriteService.removeFavorite(user.$id, id);
        setIsFavorited(false);
      } else {
        await favoriteService.addFavorite(user.$id, id);
        setIsFavorited(true);
      }

      setTimeout(() => setIsAnimating(false), 300);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      alert('Failed to update favorite. Please try again.');
      setIsAnimating(false);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return "S";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < fullStars ? "text-amber-400" : "text-gray-300"}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <Link to={`/product/${id}`} className="block">
      <div className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 relative group animate-fadeIn card-hover overflow-hidden">

        {/* Image Container - Fixed aspect ratio with better overflow handling */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-900 rounded-t-2xl">
          {imageError || !imgUrl ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Package className="w-12 h-12 text-gray-400 dark:text-gray-600" />
            </div>
          ) : (
            <img
              src={imgUrl}
              alt={`photo of ${name}`}
              className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          )}

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Condition Badge - Top Left */}
          {condition && (
            <div className={`absolute top-3 left-3 px-3 py-1 ${conditionColors[condition] || 'bg-gray-500'} rounded-full text-xs font-medium text-white uppercase tracking-wide`}>
              {condition}
            </div>
          )}

          {/* Favorite Button - Top Right */}
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-3 right-3 z-10 p-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-full shadow-lg transition-all duration-200 ${isAnimating ? 'animate-pop' : ''} ${loading ? 'opacity-70' : 'hover:scale-110 hover:bg-white dark:hover:bg-gray-800'}`}
            disabled={loading}
          >
            {isFavorited ? (
              <FaHeart className="w-5 h-5 text-red-500" />
            ) : (
              <FiHeart className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>

          {/* Category Badge - Bottom Left of image */}
          <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/70 dark:bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white uppercase tracking-wide">
            {category}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-2">
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 min-h-[3rem] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {name}
          </h2>

          <div className="flex items-center justify-between mt-1">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              ₹{parseFloat(price).toLocaleString('en-IN')}
            </span>

            {/* Stats */}
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
              {views !== undefined && views > 0 && (
                <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {views}
                </span>
              )}
              {favoriteCount !== undefined && favoriteCount > 0 && (
                <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded-full">
                  <FaHeart className="w-3 h-3 text-red-400" />
                  {favoriteCount}
                </span>
              )}
            </div>
          </div>

          {/* Seller Info */}
          {(sellerName || sellerAvatar) && (
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100 dark:border-gray-800">
              {/* Seller Avatar */}
              <div className="w-7 h-7 rounded-full bg-gray-300 dark:bg-gray-900 flex items-center justify-center text-xs font-semibold text-gray-700 dark:text-gray-400">
                {sellerAvatar ? (
                  <img src={sellerAvatar} alt={sellerName} className="w-full h-full rounded-full object-cover" loading="lazy" />
                ) : (
                  getInitials(sellerName)
                )}
              </div>
              {/* Seller Name */}
              <span className="text-sm text-gray-600 dark:text-gray-500 truncate flex-1">
                {sellerName || "Unknown Seller"}
              </span>
              {/* Star Rating */}
              {rating !== undefined && (
                <div className="flex items-center text-xs">
                  {renderStars(rating)}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Cart;