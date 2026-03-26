import React from "react";
import { Link } from "react-router-dom";

const OwnerItemCard = ({ imgUrl, name, category, price, id }) => {
  return (
    <Link to={`/profile/product/${id}`} className="block">

      <div className="tilt-card glass rounded-2xl overflow-hidden relative group border border-subtle m-3 w-75">

        {/* Image */}
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-2xl bg-[#0C0C0C]">
          <img
            src={imgUrl}
            alt={`photo of ${name}`}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />

          {/* Category Badge */}
          <div className="absolute bottom-3 left-3 px-3 py-1.5 glass rounded-full text-xs font-semibold text-white uppercase tracking-wide border border-subtle">
            {category}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-3 bg-[#0C0C0C]">
          <h2 className="font-card-title text-white line-clamp-2 leading-snug">
            {name}
          </h2>

          <div className="flex items-center justify-between mt-1">
            <span className="text-xl font-extrabold text-white tracking-tight">
              ₹{parseFloat(price).toLocaleString('en-IN')}
            </span>
          </div>
        </div>

      </div>

    </Link>
  );
};

export default OwnerItemCard;
