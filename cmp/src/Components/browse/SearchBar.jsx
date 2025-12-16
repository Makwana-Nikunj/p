import React from 'react'
import { FiSearch } from "react-icons/fi";


const SearchBar = () => {
  return (

    
        
         <div className='w-[90%] flex flex-wrap justify-center items-center gap-10'>


            <div className='flex justify-between items-center w-[70%] bg-gray-100 rounded-sm p-2 gap-4'>

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
                  placeholder='Search for product' />
            </div>

            <div className='w-[20%]rounded-md flex items-center gap-5'>

                <select className="max-w-[50%]  px-3 py-2 rounded-md bg-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-black">
                    <option>All Categories</option>
                    <option>Books</option>
                    <option>Electronics</option>
                    <option>Furniture</option>
                    <option>Transportation</option>
                    <option>Accessories</option>
                </select>

                <select className="max-w-[50%] px-4 py-2  bg-gray-100 text-black rounded-md text-sm focus:outline-none">
                    <option className='rounded'>Newest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                </select>



            </div>

        </div>
      

  )
}

export default SearchBar    