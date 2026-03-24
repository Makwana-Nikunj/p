import { useForm } from "react-hook-form";
import productService from '../services/productService';
import { useSelector } from "react-redux";

const AddItem = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const user = useSelector((state) => state.auth.userData);

  // -------------------
  // SUBMIT HANDLER
  // -------------------
  const onSubmit = async (data) => {
    try {
      // 1. Upload image
      const imageFile = data.image[0];

      const uploadedImage = await productService.uploadFile(imageFile);

      // ✅ FIX: return null instead of false, so check for null safely
      if (!uploadedImage || !uploadedImage.$id) {
        alert("Image upload failed!");
        return;
      }

      // SAFE IMAGE ID
      const imageID = uploadedImage.$id;

      // 2. Create product document
        const product = await productService.createProduct({
          title: data.title,
          price: Number(data.price),
          category: data.category,
          condition: data.condition || "",
          location: data.location || "",
          description: data.description,
          imageId: imageID,
          userId: user?.$id,
          sellerName: user.name || user.email.split("@")[0],
          // No need to set status/listing_status - backend sets: status='pending', listing_status='active'
      });

      if (product) {
        alert("✅ Product listed successfully! It will appear in Browse section.");
        reset();
      } else {
        alert("❌ Error creating product. Please try again.");
      }

    } catch (error) {
      console.error("Error submitting product:", error);
      alert("❌ Failed to list product. Please check your internet connection and try again.");
    }
  };

  return (
    <div className="w-full flex items-center justify-center m-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[80%] space-y-4 border border-gray-300 dark:border-gray-800 rounded-xl p-6 bg-white dark:bg-gray-900"
      >
        <h2 className="text-xl font-semibold">Add Product</h2>

        <div className="w-full flex flex-col md:flex-row gap-6">

          {/* LEFT */}
          <div className="md:w-full max-h-2xl flex flex-col items-start gap-5">

            {/* Title */}
            <div className="w-full">
              <input
                placeholder="Product name"
                {...register("title", { required: "Product name is required" })}
                className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2 outline-none focus:border-black dark:focus:border-gray-400 focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
              />
              {errors.title && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="w-full">
              <input
                type="number"
                placeholder="Price (₹)"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 1, message: "Price must be greater than 0" },
                })}
                className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2 outline-none focus:border-black dark:focus:border-gray-400 focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
              />
              {errors.price && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Image */}
            <div className="w-full">
              <input
                type="file"
                accept="image/*"
                {...register("image", {
                  required: "Product image is required",
                })}
                className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2 outline-none focus:border-black dark:focus:border-gray-400 focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
              />
              {errors.image && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.image.message}
                </p>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="md:w-full max-h-2xl flex flex-col gap-5 items-start justify-between">

            {/* Category */}
            <div className="w-full">
              <select
                {...register("category", { required: "Category is required" })}
                className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2 outline-none focus:border-black dark:focus:border-gray-400 focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
              >
                <option value="">Select category</option>
                <option value="books">Books</option>
                <option value="electronics">Electronics</option>
                <option value="stationery">Stationery</option>
                <option value="others">Others</option>
              </select>
              {errors.category && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Condition */}
            <select
              {...register("condition")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-black focus:ring-2 focus:ring-black/20"
            >
              <option value="">Condition (optional)</option>
              <option value="like-new">Like New</option>
              <option value="good">Good</option>
              <option value="used">Used</option>
            </select>

            {/* Location */}
            <input
              placeholder="Location (e.g. North Campus Dorms)"
              {...register("location")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-black focus:ring-2 focus:ring-black/20"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <textarea
            rows={3}
            placeholder="Product description"
            {...register("description", { required: "Description is required" })}
            className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2 outline-none resize-none focus:border-black dark:focus:border-gray-400 focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
          />
          {errors.description && (
            <p className="text-sm text-red-500 mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full border border-black dark:border-white rounded-md py-2 font-medium transition hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:text-white active:scale-95"
        >
          List Product
        </button>
      </form>
    </div>
  );
};

export default AddItem;
