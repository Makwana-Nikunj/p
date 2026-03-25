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
    <div className="w-full max-w-7xl mx-auto mt-12 px-4 sm:px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-blue-500/30 dark:border-blue-400/30">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold dark:text-white tracking-tight">
            Trending right now
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5">
            Most popular items this week 🔥
          </p>
        </div>

        <Link
          to="/browse"
          className="group inline-flex items-center gap-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-5 py-2.5 rounded-xl font-bold transition-all duration-300 hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-0.5 btn-press bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
        >
          View All
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Product Grid - 4 columns with staggered animations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="stagger-1"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Cart
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingSection;