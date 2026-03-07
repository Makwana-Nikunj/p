import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import favoriteService from '../../../appwrite/favoriteService';
import productService from '../../../appwrite/productService';

const Cart = ({ imgUrl, name, category, price, id }) => {
  const user = useSelector((state) => state.auth.userData);
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(false);

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
      
      if (isFavorited) {
        await favoriteService.removeFavorite(user.$id, id);
        setIsFavorited(false);
      } else {
        await favoriteService.addFavorite(user.$id, id);
        setIsFavorited(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      alert('Failed to update favorite. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link to={`/product/${id}`}>
      <div className="m-3 w-75 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition duration-300 relative group">

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
          disabled={loading}
        >
          {isFavorited ? (
            <FaHeart className="w-5 h-5 text-red-500" />
          ) : (
            <FiHeart className="w-5 h-5 text-gray-600" />
          )}
        </button>

        {/* Image */}
        <div className="w-full h-56 overflow-hidden rounded-t-2xl">
          <img
            src={imgUrl}
            alt={`photo of ${name}`}
            className="w-full h-48 object-fill p-2 rounded-t-xl hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-2 flex flex-col gap-2">
          <span className="text-xs uppercase tracking-wide text-gray-500">
            {category}
          </span>

          <h2 className="text-lg font-semibold text-gray-800">
            {name}
          </h2>

          <div className="flex items-center justify-between mt-1">
            <span className="text-xl font-bold text-black">
              ₹{price}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Cart;
