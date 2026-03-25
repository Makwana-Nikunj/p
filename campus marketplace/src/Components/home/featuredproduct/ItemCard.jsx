import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import favoriteService from '../../../services/favoriteService';
import { Package } from 'lucide-react';

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
        <span key={i} className={i < fullStars ? "text-amber-400" : "text-gray-500"}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <Link to={`/product/${id}`} className="block">
      <div className="tilt-card glass rounded-2xl overflow-hidden relative group">
        {/* Image */}
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-2xl bg-[#0C0C0C]">
          {imageError || !imgUrl ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Package className="w-12 h-12 text-gray-500" />
            </div>
          ) : (
            <img
              src={imgUrl}
              alt={`photo of ${name}`}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          )}

          {/* Condition Badge - Top Left with Indigo gradient */}
          {condition && (
            <div className="absolute top-3 left-3 px-3 py-1.5 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full text-xs font-bold text-white uppercase tracking-wider shadow-lg">
              {condition}
            </div>
          )}

          {/* Favorite Button - Top Right */}
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-3 right-3 z-20 p-2.5 glass rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 ${isAnimating ? 'animate-pop' : ''} ${loading ? 'opacity-50 cursor-not-allowed' : ''} border border-subtle`}
            disabled={loading}
          >
            {isFavorited ? (
              <FaHeart className="w-5 h-5 text-red-500" style={{ filter: 'drop-shadow(0 0 8px rgba(239,68,68,0.6))' }} />
            ) : (
              <FiHeart className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
            )}
          </button>

          {/* Category Badge */}
          <div className="absolute bottom-3 left-3 px-3 py-1.5 glass rounded-full text-xs font-semibold text-white uppercase tracking-wide border border-subtle">
            {category}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-3 bg-[#0C0C0C]">
          {/* Title */}
          <h2 className="font-card-title text-white line-clamp-2 leading-snug">
            {name}
          </h2>

          <div className="flex items-center justify-between mt-1">
            <span className="text-xl font-extrabold text-white tracking-tight">
              ₹{parseFloat(price).toLocaleString('en-IN')}
            </span>

            {/* Stats */}
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              {views !== undefined && views > 0 && (
                <span className="inline-flex items-center gap-1 glass px-2 py-1 rounded-full border border-subtle">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {views}
                </span>
              )}
              {favoriteCount !== undefined && favoriteCount > 0 && (
                <span className="inline-flex items-center gap-1 glass px-2 py-1 rounded-full border border-subtle">
                  <FaHeart className="w-3 h-3 text-red-500" />
                  <span className="text-red-400">{favoriteCount}</span>
                </span>
              )}
            </div>
          </div>

          {/* Seller Info */}
          {(sellerName || sellerAvatar) && (
            <div className="flex items-center gap-2 mt-2 pt-3 border-t border-subtle">
              {/* Seller Avatar */}
              <div className="w-7 h-7 rounded-full glass flex items-center justify-center text-xs font-bold text-white shadow-sm">
                {sellerAvatar ? (
                  <img src={sellerAvatar} alt={sellerName} className="w-full h-full rounded-full object-cover" loading="lazy" />
                ) : (
                  getInitials(sellerName)
                )}
              </div>
              {/* Seller Name */}
              <span className="text-sm text-gray-400 truncate flex-1 font-medium">
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