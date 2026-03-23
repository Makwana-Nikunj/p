import React from "react";
import Cart from "./featuredproduct/ItemCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import productService from "../../services/productService";
import { ArrowRight } from "lucide-react";

const TrendingSection = () => {
  const products = useSelector((state) => state.products.products);

  const activeProducts = products.filter(p => p.status === "approved" || p.status === "active")

  // Only show products that have an image
  const productsWithImages = activeProducts.filter(p => p.imageId);

  // Format products for Cart component
  const items = productsWithImages.slice(0, 4).map((doc) => ({
    id: doc.$id,
    imgUrl: productService.getFileView(doc.imageId),
    category: doc.category,
    name: doc.title,
    price: doc.price,
    condition: doc.condition,
    sellerName: doc.sellerName,
    sellerAvatar: doc.sellerAvatar,
    rating: doc.rating,
  }));

  return (
    <div className="w-full max-w-7xl mx-auto mt-8 px-4 sm:px-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h2 className="text-2xl font-bold dark:text-white">
            Trending right now
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Most popular items this week
          </p>
        </div>

        <Link
          to="/browse"
          className="group inline-flex items-center gap-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black hover:border-black dark:hover:border-white btn-press"
        >
          View All
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Product Grid - 4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <Cart
            key={item.id}
            id={item.id}
            imgUrl={item.imgUrl}
            category={item.category}
            name={item.name}
            price={item.price}
            condition={item.condition}
            sellerName={item.sellerName}
            sellerAvatar={item.sellerAvatar}
            rating={item.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingSection;