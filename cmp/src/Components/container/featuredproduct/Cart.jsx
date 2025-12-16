import React from 'react'

const Cart = ({ imgUrl, name, category, price }) => {
  return (
    <div className="w-full max-w-80 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition duration-300">

      {/* Image */}
      <div className="w-full h-56 overflow-hidden rounded-t-2xl">
        <img
          src={imgUrl}
          alt={`photo of ${name}`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">

        <span className="text-xs uppercase tracking-wide text-gray-500">
          {category}
        </span>

        <h2 className="text-lg font-semibold text-gray-800">
          {name}
        </h2>

          <span className="text-sm tracking-wide text-gray-500">
          Seller : nikunj
        </span>




        <div className="flex items-center justify-between mt-1">
          <span className="text-xl font-bold text-black">
            ₹{price}
          </span>

         
        </div>
      </div>

    </div>
  )
}

export default Cart
