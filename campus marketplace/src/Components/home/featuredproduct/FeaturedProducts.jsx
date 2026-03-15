import React from "react";
import Cart from "./ItemCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import productService from "../../../services/productService";

const FeaturedProducts = () => {
  const products = useSelector((state) => state.products.products);

  const activeProducts = products.filter(p => p.status === "approved" || p.status === "active")




  // Format products for Cart component
  const items = activeProducts.map((doc) => ({
    id: doc.$id, // <-- added
    imgUrl: productService.getFileView(doc.imageId),
    category: doc.category,
    name: doc.title,
    price: doc.price,
  }));

  return (
    <div className="w-[90%] mt-4">
      {/* top */}
      <div className="  mx-25 flex items-center justify-between">
        <span className="text-2xl font-bold">Featured Products</span>

        <Link
          to="/browse"
          className="
            inline-block
            border border-gray-300
            px-4 py-2
            rounded-lg
            font-semibold
            transition-all
            duration-300
            ease-in-out
            hover:bg-black
            hover:text-white
            hover:border-black
            active:scale-95
          "
        >
          View All
        </Link>
      </div>

      {/* bottom */}
      <div className="mt-6 p-2 flex justify-center items-center gap-12 flex-wrap">
        {Array.from({ length: Math.min(6, items.length) }).map((_, i) => (
          <Cart
            key={items[i].id}
            id={items[i].id} // <-- added
            imgUrl={items[i].imgUrl}
            category={items[i].category}
            name={items[i].name}
            price={items[i].price}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
