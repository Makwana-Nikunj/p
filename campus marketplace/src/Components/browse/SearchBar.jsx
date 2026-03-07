import React from 'react'
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ search, setSearch, category, setCategory, sort, setSort, minPrice, setMinPrice, maxPrice, setMaxPrice }) => {
  return (
    <div className='w-[90%] flex flex-col gap-4'>
      
      {/* Search and Dropdowns */}
      <div className='flex flex-wrap justify-center items-center gap-4'>
        <div className='flex justify-between items-center flex-1 min-w-75 bg-gray-100 rounded-sm p-2 gap-4'>
          <FiSearch />
          <input
            className="
              w-full  
              rounded-md
              text-sm
              outline-none
              focus:outline-none
              focus:border-gray-300
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
          className="px-3 py-2 rounded-md bg-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-black"
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
          className="px-4 py-2 bg-gray-100 text-black rounded-md text-sm focus:outline-none"
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
          <span className='text-sm font-medium text-gray-700'>Price Range:</span>
          <input
            type="number"
            placeholder="Min ₹"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-24 px-3 py-2 rounded-md bg-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-black"
          />
          <span className='text-gray-500'>-</span>
          <input
            type="number"
            placeholder="Max ₹"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-24 px-3 py-2 rounded-md bg-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-black"
          />
          {(minPrice || maxPrice) && (
            <button
              onClick={() => {
                setMinPrice("");
                setMaxPrice("");
              }}
              className="text-sm text-gray-600 hover:text-black underline"
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
