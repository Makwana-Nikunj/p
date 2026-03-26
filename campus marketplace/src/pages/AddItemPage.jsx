import { useForm } from "react-hook-form";
import productService from '../services/productService';
import { useSelector } from "react-redux";
import AtmosphericBlooms from '../Components/AtmosphericBlooms';

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
    <div className="min-h-screen w-full flex items-center justify-center relative py-10">
      <AtmosphericBlooms intensity="vibrant" />
      <div className="w-[95%] max-w-4xl section-spacing">
        <h1 className="font-section-headline gradient-text text-center mb-10">List New Item</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="glass glass-intense rounded-2xl p-8 space-y-6 border border-subtle shadow-2xl"
        >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* LEFT COLUMN */}
          <div className="space-y-5">

            {/* Title */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-300 mb-2">Product Name</label>
              <input
                placeholder="Enter product name"
                {...register("title", { required: "Product name is required" })}
                className="w-full glass rounded-lg px-4 py-3 outline-none focus-glow-indigo transition-all duration-300 text-white placeholder-gray-500"
              />
              {errors.title && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-300 mb-2">Price (₹)</label>
              <input
                type="number"
                placeholder="0.00"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 1, message: "Price must be greater than 0" },
                })}
                className="w-full glass rounded-lg px-4 py-3 outline-none focus-glow-indigo transition-all duration-300 text-white placeholder-gray-500"
              />
              {errors.price && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Image Upload Zone */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-300 mb-2">Product Image</label>
              <div className="upload-zone rounded-xl p-6 text-center cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  {...register("image", {
                    required: "Product image is required",
                  })}
                  className="w-full h-full absolute inset-0 opacity-0 cursor-pointer"
                />
                <p className="text-gray-400">Click or drag to upload image</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
              </div>
              {errors.image && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.image.message}
                </p>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-5">

            {/* Category */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
              <select
                {...register("category", { required: "Category is required" })}
                className="w-full glass rounded-lg px-4 py-3 outline-none focus-glow-indigo transition-all duration-300 text-white"
              >
                <option value="" className="text-gray-900">Select category</option>
                <option value="books" className="text-gray-900">Books</option>
                <option value="electronics" className="text-gray-900">Electronics</option>
                <option value="stationery" className="text-gray-900">Stationery</option>
                <option value="others" className="text-gray-900">Others</option>
              </select>
              {errors.category && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Condition */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-300 mb-2">Condition (optional)</label>
              <select
                {...register("condition")}
                className="w-full glass rounded-lg px-4 py-3 outline-none focus-glow-indigo transition-all duration-300 text-white"
              >
                <option value="" className="text-gray-900">Select condition</option>
                <option value="like-new" className="text-gray-900">Like New</option>
                <option value="good" className="text-gray-900">Good</option>
                <option value="used" className="text-gray-900">Used</option>
              </select>
            </div>

            {/* Location */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
              <input
                placeholder="e.g. North Campus Dorms"
                {...register("location")}
                className="w-full glass rounded-lg px-4 py-3 outline-none focus-glow-indigo transition-all duration-300 text-white placeholder-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
          <textarea
            rows={4}
            placeholder="Describe your item..."
            {...register("description", { required: "Description is required" })}
            className="w-full glass rounded-lg px-4 py-3 outline-none resize-none focus-glow-indigo transition-all duration-300 text-white placeholder-gray-500"
          />
          {errors.description && (
            <p className="text-sm text-red-400 mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full btn-gradient-primary py-3 rounded-lg font-semibold text-lg shadow-lg"
        >
          List Product
        </button>
      </form>
      {/* Close section-spacing wrapper */}
    </div>
    {/* Close outer py-10 container */}
  </div>
  );
};

export default AddItem;
