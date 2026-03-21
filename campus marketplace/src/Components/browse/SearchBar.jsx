import React from 'react'
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ search, setSearch, category, setCategory, sort, setSort, minPrice, setMinPrice, maxPrice, setMaxPrice }) => {
  return (
    <div className='w-[90%] flex flex-col gap-4'>
      
      {/* Search and Dropdowns */}
      <div className='flex flex-wrap justify-center items-center gap-4'>
        <div className='flex justify-between items-center flex-1 min-w-75 bg-gray-100 dark:bg-gray-800 rounded-sm p-2 gap-4'>
          <FiSearch className="text-gray-500 dark:text-gray-400" />
          <input
            className="
              w-full  
              rounded-md
              bg-transparent
              text-sm
              dark:text-white
              outline-none
              focus:outline-none
              focus:border-gray-300
              dark:focus:border-gray-600
              focus:ring-0
              focus-visible:ring-0
            "
            type="text"
            placeholder="Search for product"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
        >
          <option value="all">All Categories</option>
          <option value="books">Books</option>
          <option value="electronics">Electronics</option>
          <option value="stationery">Stationery</option>
          <option value="others">Others</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-md text-sm focus:outline-none"
        >
          <option value="newest">Newest</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
          <option value="popular">Most Viewed</option>
          <option value="favorites">Most Favorited</option>
        </select>
      </div>

      {/* Price Range Filter */}
      <div className='flex flex-wrap justify-center items-center gap-4'>
        <div className='flex items-center gap-2'>
          <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>Price Range:</span>
          <input
            type="number"
            placeholder="Min ₹"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-24 px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
          />
          <span className='text-gray-500'>-</span>
          <input
            type="number"
            placeholder="Max ₹"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-24 px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
          />
          {(minPrice || maxPrice) && (
            <button
              onClick={() => {
                setMinPrice("");
                setMaxPrice("");
              }}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white underline"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className='hidden'>
        {/* Spacer for layout */}
      </div>
    </div>
  );
};

export default SearchBar;
