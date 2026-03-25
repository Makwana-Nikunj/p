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
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);

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

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (max 5 degrees)
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setTiltX(rotateX);
    setTiltY(rotateY);
  };

  const handleMouseLeave = () => {
    setTiltX(0);
    setTiltY(0);
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
        <span key={i} className={i < fullStars ? "text-amber-400" : "text-gray-300 dark:text-gray-600"}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <Link to={`/product/${id}`} className="block perspective-1000">
      <div
        className="w-full bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700/50 rounded-2xl shadow-lg hover:shadow-2xl dark:hover:shadow-blue-900/30 transition-all duration-300 relative group animate-fadeIn card-hover overflow-hidden transform-gpu"
        style={{
          transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          transformStyle: 'preserve-3d'
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >

        {/* Image Container - Fixed aspect ratio with better overflow handling */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-t-2xl">
          {imageError || !imgUrl ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Package className="w-12 h-12 text-gray-400 dark:text-gray-600" />
            </div>
          ) : (
            <img
              src={imgUrl}
              alt={`photo of ${name}`}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          )}

          {/* Multi-layered gradient overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-transparent to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500" />

          {/* Condition Badge - Top Left with 3D effect */}
          {condition && (
            <div className={`absolute top-3 left-3 px-3 py-1.5 ${conditionColors[condition] || 'bg-gradient-to-r from-gray-500 to-gray-600'} rounded-full text-xs font-bold text-white uppercase tracking-wider shadow-lg transform translate-z-10`}>
              {condition}
            </div>
          )}

          {/* Favorite Button - Top Right with improved design */}
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-3 right-3 z-20 p-2.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${isAnimating ? 'animate-pop' : ''} ${loading ? 'opacity-50 cursor-not-allowed' : ''} border border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-700`}
            disabled={loading}
          >
            {isFavorited ? (
              <FaHeart className="w-5 h-5 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
            ) : (
              <FiHeart className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-red-500 transition-colors" />
            )}
          </button>

          {/* Category Badge */}
          <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-gradient-to-r from-black/70 to-black/50 dark:from-white/20 dark:to-white/10 backdrop-blur-sm rounded-full text-xs font-semibold text-white uppercase tracking-wide shadow-lg border border-black/10 dark:border-white/10">
            {category}
          </div>

          {/* Glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-3 relative">
          {/* Title */}
          <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 line-clamp-2 min-h-[2.75rem] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
            {name}
          </h2>

          <div className="flex items-center justify-between mt-1">
            <span className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              ₹{parseFloat(price).toLocaleString('en-IN')}
            </span>

            {/* Stats */}
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              {views !== undefined && views > 0 && (
                <span className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-800/70 px-2 py-1 rounded-full border border-gray-200 dark:border-gray-700">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {views}
                </span>
              )}
              {favoriteCount !== undefined && favoriteCount > 0 && (
                <span className="inline-flex items-center gap-1 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-full border border-red-100 dark:border-red-900/30">
                  <FaHeart className="w-3 h-3 text-red-500" />
                  <span className="text-red-600 dark:text-red-400">{favoriteCount}</span>
                </span>
              )}
            </div>
          </div>

          {/* Seller Info */}
          {(sellerName || sellerAvatar) && (
            <div className="flex items-center gap-2 mt-2 pt-3 border-t border-gray-100 dark:border-gray-700/50">
              {/* Seller Avatar */}
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center text-xs font-bold text-gray-700 dark:text-gray-300 shadow-sm">
                {sellerAvatar ? (
                  <img src={sellerAvatar} alt={sellerName} className="w-full h-full rounded-full object-cover" loading="lazy" />
                ) : (
                  getInitials(sellerName)
                )}
              </div>
              {/* Seller Name */}
              <span className="text-sm text-gray-700 dark:text-gray-400 truncate flex-1 font-medium">
                {sellerName || "Unknown Seller"}
              </span>
              {/* Star Rating */}
              {rating !== undefined && (
                <div className="flex items-center text-xs gap-0.5">
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