import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  MapPin,
  Calendar,
  Package,
  ChevronLeft,
} from "lucide-react";
import productService from '../services/productService';
import { fetchProducts } from '../store/productSlice';

const OwnerProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);

  // Find product owned by user
  const product = products.find((p) => p.$id === id);

  if (!product) {
    return (
      <p className="text-center mt-20 text-lg font-semibold text-red-500">
        Product not found!
      </p>
    );
  }

  // Move status handler
  const handleMoveStatus = async () => {
    const newStatus = product.status === "active" ? "sold" : "active";

    await productService.updateProduct(product.$id, { status: newStatus });

    // Refresh redux store
    dispatch(fetchProducts());

    // Redirect back to profile
    navigate("/profile");
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-50 py-6">

      {/* Back Button */}
      <div className="w-[90%] lg:w-[82%]">
        <button
          onClick={() => navigate("/profile")}
          className="mb-4 p-2 flex items-center bg-black text-white dark:bg-white dark:text-black rounded-xl"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Profile
        </button>
      </div>

      {/* Main Container */}
      <div className="w-[90%] lg:w-[82%] bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 flex flex-col md:flex-row gap-8 shadow">

        {/* LEFT: PRODUCT IMAGE */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img
            src={productService.getFileView(product.imageId)}
            alt={product.title}
            className="
              w-full
              max-h-[280px]
              sm:max-h-[340px]
              md:max-h-[480px]
              lg:max-h-[520px]
              object-fill
              rounded-lg
            "
            loading="lazy"
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

              <span className="bg-black text-white dark:bg-white dark:text-black rounded-lg px-4 py-2 text-sm">
                {product.category}
              </span>
            </div>

            <p className="text-primary font-semibold text-lg sm:text-xl md:text-2xl">
              ₹ {product.price}
            </p>

            {/* Specs */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
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
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                {product.description}
              </p>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col gap-4 mt-6">

            {/* EDIT PRODUCT */}
            <button
              onClick={() => navigate(`/edit-product/${product.$id}`)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
            >
              Edit Product
            </button>

            {/* MOVE STATUS BUTTON */}
            <button
              onClick={handleMoveStatus}
              className="w-full bg-black text-white dark:bg-white dark:text-black py-2 rounded-lg font-medium hover:bg-gray-900 dark:hover:bg-gray-200"
            >
              {product.status === "active"
                ? "Move to Sold"
                : "Move to Active"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default OwnerProductDetail;
