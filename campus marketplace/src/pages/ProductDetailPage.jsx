import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  MessageSquare,
  MapPin,
  Calendar,
  Package,
  ChevronLeft,
  AlertCircle
} from "lucide-react";
import productService from '../services/productService';
import Cart from '../Components/home/featuredproduct/ItemCard';
import chatService from '../services/chatService';
import profileService from '../services/profileService';
import { ProductDetailSkeleton, ProductGridSkeleton } from '../Components/SkeletonLoader';
import { useToast } from '../Components/Toast/ToastContainer';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const products = useSelector((state) => state.products.products);
  const user = useSelector((state) => state.auth.userData);

  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading check on mount
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 300);
  }, [id]);

  const product = products.find((p) => p.$id === id);

  // Show loading skeleton while product data loads
  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center bg-gray-50 py-6">
        <div className="w-[90%] lg:w-[82%]">
          <div className="h-10 bg-gray-300 rounded animate-pulse mb-4 w-32"></div>
          <ProductDetailSkeleton />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 py-6 px-4">
        <div className="flex flex-col items-center text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6 max-w-md">
            This product doesn't exist or has been removed. Please browse other products or return to the listing.
          </p>
          <button
            onClick={() => navigate("/browse")}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Browse
          </button>
        </div>
      </div>
    );
  }

  // Related products
  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.$id !== product.$id && (p.status === "approved" || p.status === "active")
  ).slice(0, 4);

  const handleMessageSeller = async () => {
    try {
      if (!user) {
        showToast('Please log in to message sellers', 'info', 3000);
        navigate("/login");
        return;
      }

      if (user.$id === product.userId) {
        showToast("You can't message yourself", 'warning', 3000);
        return;
      }

      setIsLoadingChat(true);
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
        showToast('Chat opened successfully', 'success', 2000);
        navigate("/chat");
      }
    } catch (error) {
      console.error("Error creating conversation:", error);
      showToast(`Failed to start chat: ${error.message}`, 'error', 4000);
    } finally {
      setIsLoadingChat(false);
    }
  };

  // Format date nicely
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
      return 'Recently added';
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-50 py-6 pb-12">

      {/* Back Button */}
      <div className="w-[90%] lg:w-[82%]">
        <button
          onClick={() => navigate("/browse")}
          className="mb-4 p-2 flex items-center gap-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Browse
        </button>
      </div>

      {/* Main Container */}
      <div className="w-[90%] lg:w-[82%] bg-white dark:bg-gray-800 rounded-lg p-4 md:p-8 flex flex-col md:flex-row gap-8 shadow-md">

        {/* LEFT: PRODUCT IMAGE */}
        <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-50 dark:bg-gray-800/50 rounded-lg overflow-hidden min-h-[300px] md:min-h-0 aspect-square md:max-h-[600px]">
          <img
            src={productService.getFileView(product.imageId)}
            alt={product.title}
            className="w-full h-full object-contain p-2 md:p-6"
            loading="lazy"
          />
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full md:w-1/2 flex flex-col justify-between space-y-6">

          {/* Product Header */}
          <div className="space-y-4 border-b pb-4">

            <div className="w-full flex items-start justify-between gap-4 flex-col sm:flex-row">
              <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl leading-tight">
                {product.title}
              </h1>
              <span className="bg-black text-white rounded-lg px-4 py-2 text-xs font-semibold whitespace-nowrap">
                {product.category}
              </span>
            </div>

            <p className="text-2xl sm:text-3xl font-bold text-green-600">
              ₹ {parseFloat(product.price).toLocaleString('en-IN')}
            </p>
          </div>

          {/* Product Specs */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-700">
              <Package className="w-5 h-5 text-gray-600" />
              <span className="text-sm md:text-base">
                <span className="font-semibold">Condition:</span> {product.condition || "Not specified"}
              </span>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <MapPin className="w-5 h-5 text-gray-600" />
              <span className="text-sm md:text-base">
                <span className="font-semibold">Location:</span> {product.location || "Not specified"}
              </span>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <Calendar className="w-5 h-5 text-gray-600" />
              <span className="text-sm md:text-base">
                <span className="font-semibold">Posted:</span> {formatDate(product.$createdAt)}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Description</h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              {product.description || "No description provided"}
            </p>
          </div>

          {/* Seller Info Card */}
          <div className="border-2 border-gray-200 rounded-lg p-5 space-y-4 mt-auto">
            <h3 className="font-semibold text-lg">Seller Information</h3>

            <div className="flex items-center gap-4">
              <img
                src={
                  profileService.getProfilePhoto(product.sellerAvatar) ||
                  "https://img.freepik.com/free-icon/user_318-159711.jpg"
                }
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                alt={product.sellerName || "Seller"}
              />
              <div>
                <p className="font-semibold text-lg text-gray-800">
                  {product.sellerName || "Unknown Seller"}
                </p>
                <p className="text-sm text-gray-500">Campus Member</p>
              </div>
            </div>

            <button
              onClick={handleMessageSeller}
              disabled={isLoadingChat}
              className={`flex justify-center items-center gap-2 w-full px-4 py-3 rounded-lg font-semibold transition-colors ${isLoadingChat
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-gray-800'
                }`}
            >
              {isLoadingChat ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Starting chat...
                </>
              ) : (
                <>
                  <MessageSquare className="w-5 h-5" />
                  Message Seller
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <div className="w-[90%] lg:w-[82%] mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
