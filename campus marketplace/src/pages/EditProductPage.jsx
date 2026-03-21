import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import productService from '../services/productService';
import { fetchProducts } from '../store/productSlice';
import { useEffect, useState } from "react";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);
  const product = products.find((p) => p.$id === id);

  const [newImageFile, setNewImageFile] = useState(null);

  const previewImage = newImageFile
    ? URL.createObjectURL(newImageFile)
    : (product ? productService.getFileView(product.imageId) : null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  // Pre-fill form fields
  useEffect(() => {
    if (product) {
      setValue("title", product.title);
      setValue("price", product.price);
      setValue("category", product.category);
      setValue("condition", product.condition);
      setValue("location", product.location);
      setValue("description", product.description);
    }
  }, [product, setValue]);

  if (!product) return <p>Loading...</p>;

  // ---------------------------
  // SUBMIT EDITED PRODUCT
  // ---------------------------
  const onSubmit = async (data) => {
    try {
      let updatedImageId = product.imageId;

      // If user selected new image:
      if (newImageFile) {
        const uploaded = await productService.uploadFile(newImageFile);

        if (!uploaded || !uploaded.$id) {
          alert("Image upload failed");
          return;
        }

        updatedImageId = uploaded.$id;
      }

      // Update DB
      await productService.updateProduct(product.$id, {
        title: data.title,
        price: Number(data.price),
        category: data.category,
        condition: data.condition,
        location: data.location,
        description: data.description,
        imageId: updatedImageId,
      });

      dispatch(fetchProducts());

      alert("✅ Product updated successfully!");
      navigate(`/profile/product/${product.$id}`);
    } catch (err) {
      console.error("Failed to update product:", err);
      alert("❌ Error updating product. Please try again.");
    }
  };

  // ---------------------------
  // IMAGE HANDLER
  // ---------------------------
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setNewImageFile(file);
  };

  return (
    <div className="w-full flex items-center justify-center m-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[80%] space-y-4 border border-gray-300 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-800 shadow-sm"
      >
        <h2 className="text-xl font-semibold dark:text-white">Edit Product</h2>

        <div className="w-full flex flex-col md:flex-row gap-6">

          {/* LEFT */}
          <div className="md:w-full flex flex-col items-start gap-5">

            {/* Image Preview */}
            <img
              src={previewImage}
              alt="Preview"
              className="w-64 h-64 object-cover rounded-lg border"
            />

            {/* Upload New Image */}
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              onChange={handleImageChange}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md px-3 py-2 outline-none focus:border-black dark:focus:border-gray-400 focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
            />

          </div>

          {/* RIGHT */}
          <div className="md:w-full flex flex-col gap-5">

            {/* Title */}
            <div>
              <input
                placeholder="Product name"
                {...register("title", { required: "Product name is required" })}
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md px-3 py-2 outline-none focus:border-black dark:focus:border-gray-400 focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* Price */}
            <div>
              <input
                type="number"
                placeholder="Price (₹)"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 1, message: "Price must be greater than 0" },
                })}
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md px-3 py-2 outline-none focus:border-black dark:focus:border-gray-400 focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price.message}</p>
              )}
            </div>

            {/* Category */}
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md px-3 py-2 outline-none focus:border-black dark:focus:border-gray-400 focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
            >
              <option value="books">Books</option>
              <option value="electronics">Electronics</option>
              <option value="stationery">Stationery</option>
              <option value="others">Others</option>
            </select>

            {/* Condition */}
            <select
              {...register("condition")}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md px-3 py-2 outline-none focus:border-black dark:focus:border-gray-400 focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
            >
              <option value="">Condition (optional)</option>
              <option value="like-new">Like New</option>
              <option value="good">Good</option>
              <option value="used">Used</option>
            </select>

            {/* Location */}
            <input
              placeholder="Location"
              {...register("location")}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md px-3 py-2 outline-none focus:border-black dark:focus:border-gray-400 focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
            />

          </div>
        </div>

        {/* Description */}
        <div>
          <textarea
            rows={3}
            placeholder="Product description"
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md px-3 py-2 outline-none resize-none focus:border-black dark:focus:border-gray-400 focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md hover:opacity-80 active:scale-95"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default EditProduct;
