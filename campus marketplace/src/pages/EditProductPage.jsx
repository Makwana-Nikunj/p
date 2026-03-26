import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import productService from '../services/productService';
import { fetchProducts } from '../store/productSlice';
import { useEffect, useState } from "react";
import AtmosphericBlooms from '../Components/AtmosphericBlooms';

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
    <div className="min-h-screen w-full flex items-center justify-center relative py-10">
      <AtmosphericBlooms intensity="vibrant" />
      <div className="w-[95%] max-w-4xl section-spacing">
        <h1 className="font-section-headline gradient-text text-center mb-10">Edit Product</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="glass glass-intense rounded-2xl p-8 space-y-6 border border-subtle shadow-2xl"
        >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* LEFT COLUMN */}
          <div className="space-y-5">

            {/* Image Preview */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-300 mb-2">Current Image</label>
              <div className="relative w-full aspect-square rounded-xl overflow-hidden glass border border-subtle">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Upload New Image */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-300 mb-2">Replace Image (optional)</label>
              <div className="upload-zone rounded-xl p-4 text-center cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  {...register("image")}
                  onChange={handleImageChange}
                  className="w-full h-full absolute inset-0 opacity-0 cursor-pointer"
                />
                <p className="text-gray-400 text-sm">Click to upload new image</p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-5">

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Product Name</label>
              <input
                placeholder="Product name"
                {...register("title", { required: "Product name is required" })}
                className="w-full glass rounded-lg px-4 py-3 outline-none focus-glow-indigo transition-all duration-300 text-white placeholder-gray-500"
              />
              {errors.title && (
                <p className="text-sm text-red-400 mt-1">{errors.title.message}</p>
              )}
            </div>

            {/* Price */}
            <div>
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
                <p className="text-sm text-red-400 mt-1">{errors.price.message}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
              <select
                {...register("category", { required: "Category is required" })}
                className="w-full glass rounded-lg px-4 py-3 outline-none focus-glow-indigo transition-all duration-300 text-white"
              >
                <option value="books" className="text-gray-900">Books</option>
                <option value="electronics" className="text-gray-900">Electronics</option>
                <option value="stationery" className="text-gray-900">Stationery</option>
                <option value="others" className="text-gray-900">Others</option>
              </select>
            </div>

            {/* Condition */}
            <div>
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
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
              <input
                placeholder="Location"
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
            placeholder="Product description"
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full glass rounded-lg px-4 py-3 outline-none resize-none focus-glow-indigo transition-all duration-300 text-white placeholder-gray-500"
          />
          {errors.description && (
            <p className="text-sm text-red-400 mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 justify-end pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 glass rounded-lg hover:bg-white/10 transition-all duration-300"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 btn-gradient-primary rounded-lg font-semibold shadow-lg disabled:opacity-50"
          >
            {isSubmitting ? "Saving…" : "Save Changes"}
          </button>
        </div>

      </form>
    </div>
  </div>
  );
};

export default EditProduct;
