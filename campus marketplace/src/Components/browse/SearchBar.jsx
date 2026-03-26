import React from 'react'
import { FiSearch, FiX } from "react-icons/fi";

const categories = [
  { value: "all", label: "All" },
  { value: "electronics", label: "Electronics" },
  { value: "textbooks", label: "Textbooks" },
  { value: "furniture", label: "Furniture" },
  { value: "clothing", label: "Clothing" },
  { value: "gaming", label: "Gaming" },
  { value: "vehicles", label: "Vehicles" },
  { value: "books", label: "Books" },
  { value: "stationery", label: "Stationery" },
  { value: "others", label: "Others" },
];

const SearchBar = ({ search, setSearch, category, setCategory, sort, setSort, minPrice, setMinPrice, maxPrice, setMaxPrice }) => {
  return (
    <div className='w-[90%] flex flex-col gap-4 animate-slideInFromTop'>

      {/* Search Input */}
      <div className='flex justify-center'>
        <div className='relative flex-1 max-w-2xl'>
          <div className='absolute left-4 top-1/2 -translate-y-1/2'>
            <FiSearch className="text-gray-400 w-5 h-5" />
          </div>
          <input
            className="
              w-full pl-12 pr-4 py-3
              glass
              rounded-xl
              text-sm text-white
              outline-none
              border border-subtle
              focus-glow-indigo
              transition-all duration-300
              placeholder-gray-500
            "
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className='absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors'
            >
              <FiX className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className='flex flex-wrap justify-center gap-2'>
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${category === cat.value
                ? "btn-gradient-primary text-white shadow-lg"
                : "glass border border-subtle text-gray-300 hover:bg-white/10"
              }
            `}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Price Range and Sort - Right aligned */}
      <div className='flex flex-wrap justify-center items-center gap-3'>
        {/* Price Range */}
        <div className='flex items-center gap-2 glass px-4 py-2.5 rounded-xl border border-subtle'>
          <span className='text-sm font-medium text-gray-300'>Price:</span>
          <input
            type="number"
            placeholder="Min ₹"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-20 px-2 py-1.5 rounded-lg glass text-white text-sm border border-subtle focus-glow-indigo transition-all"
          />
          <span className='text-gray-400'>—</span>
          <input
            type="number"
            placeholder="Max ₹"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-20 px-2 py-1.5 rounded-lg glass text-white text-sm border border-subtle focus-glow-indigo transition-all"
          />
          {(minPrice || maxPrice) && (
            <button
              onClick={() => {
                setMinPrice("");
                setMaxPrice("");
              }}
              className="ml-2 text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors flex items-center gap-1"
            >
              <FiX className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>

        {/* Sort Select */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-4 py-3 glass text-white rounded-xl text-sm border border-subtle focus-glow-indigo transition-all duration-300 cursor-pointer"
        >
          <option value="newest">Newest First</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
          <option value="popular">Most Viewed</option>
          <option value="favorites">Most Favorited</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;