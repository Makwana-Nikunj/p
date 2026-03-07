import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
  MessageSquare,
  MapPin,
  Calendar,
  Package,
  ChevronLeft
} from "lucide-react";
import productService from "../../../appwrite/productService";
import Cart from "../../home/featuredproduct/ItemCard";
import chatService from "../../../appwrite/chatService";
import profileService from "../../../appwrite/profileService";




const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const products = useSelector((state) => state.products.products);
  const user = useSelector((state) => state.auth.userData);

  const product = products.find((p) => p.$id === id);

  if (!product) {
    return (
      <p className="text-center mt-20 text-lg font-semibold text-red-500">
        Product not found!
      </p>
    );
  }

  // Related products
  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.$id !== product.$id
  );

  const handleMessageSeller = async () => {
    try {
      if (!user) {
        navigate("/login");
        return;
      }

      const buyerId = user.$id;
      const buyerName = user.name || user.email.split("@")[0];
      const sellerId = product.userId;
      const sellerName = product.sellerName;
      const productId = product.$id;
      const productName = product.title;

      const conversation = await chatService.getOrCreateConversation(
        buyerId,
        buyerName,
        sellerId,
        sellerName,
        productId,
        productName
      );

      if (conversation) {
        navigate("/chat");
      }
    } catch (error) {
      console.error("Error creating conversation:", error);
      alert("Failed to start chat: " + error.message);
    }
  };





  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-50 py-6">

      {/* Back Button */}
      <div className="w-[90%] lg:w-[82%]">
        <button
          onClick={() => navigate("/browse")}
          className="mb-4 p-2 flex items-center bg-black text-white rounded-xl"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Listings
        </button>
      </div>

      {/* Main Container */}
      <div className="w-[90%] lg:w-[82%] bg-white rounded-lg p-4 md:p-6 flex flex-col md:flex-row gap-8 shadow">

        {/* LEFT: PRODUCT IMAGE */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img
            src={productService.getFileView(product.imageId)}
            alt={product.title}
            className="
              w-full 
              max-h-70
              sm:max-h-85
              md:max-h-120
              lg:max-h-130
              object-fill
              rounded-lg
            "
          />
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">

          {/* Product Info */}
          <div className="space-y-4">

            <div className="w-full flex items-start justify-between ">

              <h1 className="font-semibold text-xl sm:text-2xl md:text-3xl">
              {product.title}
            </h1>

             <span className="bg-black text-white rounded-lg px-4 py-2 text-sm">
              {product.category}
            </span>

            </div>
           

            

            <p className="text-primary font-semibold text-lg sm:text-xl md:text-2xl">
              ₹ {product.price}
            </p>

            {/* Specs */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                <span>Condition: {product.condition || "Not provided"}</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{product.location || "Not specified"}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(product.$createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                {product.description}
              </p>
            </div>
          </div>

          {/* Seller Info */}
          <div className="border border-gray-300 rounded-lg p-4 mt-6">
            <h3 className="font-semibold mb-4 text-lg">Seller Information</h3>

            <div className="flex items-center gap-4 mb-4">
              <img
                src={
                  profileService.getProfilePhoto(product.userId) ||
                  "https://img.freepik.com/free-icon/user_318-159711.jpg"
                }
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full"
                alt="Seller"
              />

              <span className="font-medium text-lg">
                {product.sellerName || "Unknown Seller"}
              </span>
            </div>

            <button 
              onClick={handleMessageSeller}
              className="flex justify-center items-center gap-2 bg-black text-white w-full px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Message Seller
            </button>
          </div>


        </div>
      </div>

      {/* RELATED PRODUCTS */}
{relatedProducts.length > 0 && (
  <div className="w-[90%] lg:w-[82%] mt-10">
    <h2 className="text-xl font-semibold mb-4">Related Products</h2>

    <div className="flex flex-wrap gap-6 justify-start">
      {relatedProducts.map((item) => (
        <Cart
          key={item.$id}
          id={item.$id}
          imgUrl={productService.getFileView(item.imageId)}
          category={item.category}
          name={item.title}
          price={item.price}
        />
      ))}
    </div>
  </div>
)}
    </div>
  );
};

export default ProductDetailPage;
