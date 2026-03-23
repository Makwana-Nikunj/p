import React from "react";
import { Link } from "react-router-dom";

const OwnerItemCard = ({ imgUrl, name, category, price, id }) => {
  return (
    <Link to={`/profile/product/${id}`}>

      <div className="m-3 w-75 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-lg transition duration-300">

        {/* Image */}
        <div className="w-full h-56 overflow-hidden rounded-t-2xl">
          <img
            src={imgUrl}
            alt={`photo of ${name}`}
            className="w-full h-48 object-fill p-2 rounded-t-xl hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="p-2 flex flex-col gap-2">

          <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            {category}
          </span>

          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            {name}
          </h2>

          <div className="flex items-center justify-between mt-1">
            <span className="text-xl font-bold text-black dark:text-gray-100">
              ₹{price}
            </span>
          </div>

        </div>

      </div>

    </Link>
  );
};

export default OwnerItemCard;
