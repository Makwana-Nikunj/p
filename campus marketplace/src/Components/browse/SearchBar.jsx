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
          <div className='absolute left-3 top-1/2 -translate-y-1/2'>
            <FiSearch className="text-gray-400 dark:text-gray-500 w-5 h-5" />
          </div>
          <input
            className="
              w-full pl-10 pr-4 py-3
              bg-white dark:bg-gray-900
              rounded-xl
              text-sm text-gray-900 dark:text-white
              outline-none
              border border-gray-200 dark:border-gray-700
              focus:border-blue-500 dark:focus:border-blue-400
              focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20
              transition-all duration-200
            "
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className='absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors'
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
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${category === cat.value
                ? "bg-black dark:bg-white text-white dark:text-black"
                : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800"
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
        <div className='flex items-center gap-2 bg-white dark:bg-gray-900 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800'>
          <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>Price:</span>
          <input
            type="number"
            placeholder="Min ₹"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-20 px-2 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white text-sm border-0 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
          <span className='text-gray-400 dark:text-gray-500'>—</span>
          <input
            type="number"
            placeholder="Max ₹"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-20 px-2 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white text-sm border-0 focus:outline-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
          {(minPrice || maxPrice) && (
            <button
              onClick={() => {
                setMinPrice("");
                setMaxPrice("");
              }}
              className="ml-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors flex items-center gap-1"
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
          className="px-4 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl text-sm border border-gray-200 dark:border-gray-800 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all duration-200 cursor-pointer"
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