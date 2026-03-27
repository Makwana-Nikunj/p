import React from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

const NewListingCard = () => {
  return (
    <Link to="/add-item" className="block group">

      <div className="relative flex flex-col items-center justify-center p-16 rounded-[2rem] border-2 border-dashed border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all duration-500 h-full min-h-[400px]">

        <div className="w-20 h-20 rounded-full bg-surface-container-highest flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
          <FiPlus className="text-4xl" />
        </div>

        <h3 className="text-2xl font-headline font-bold text-white mb-3">New Listing</h3>
        <p className="text-[#94A3B8] text-center max-w-xs leading-relaxed">
          Add another item to your store and earn extra cash.
        </p>

      </div>

    </Link>
  );
};

export default NewListingCard;
