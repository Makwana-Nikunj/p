import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { updateProfilePhoto, login as authLogin } from '../store/authSlice';
import { useNavigate } from "react-router-dom";
import profileService from '../services/profileService';

const EditProfile = () => {
  const user = useSelector((state) => state.auth.userData);
  const profilePhoto = useSelector((state) => state.auth.profilePhoto);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: user?.name,
    },
  });

  const [preview, setPreview] = useState(profilePhoto);
  const [imageFile, setImageFile] = useState(null);

  if (!user) return <p>Loading...</p>;

  // -------------------------
  // Handle Image Preview
  // -------------------------
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // -------------------------
  // Submit Handler
  // -------------------------
  const onSubmit = async (data) => {
    try {
      let finalPhoto = profilePhoto;

      // 1. Upload new photo if selected
      if (imageFile) {
        const uploaded = await profileService.uploadProfilePhoto(user.$id, imageFile);


        if (uploaded) {
          finalPhoto = profileService.getProfilePhoto(uploaded.avatar || uploaded);
        }
      }

      // 2. Update name in appwrite prefs
      await profileService.updateName(data.name);

      // 3. Update Redux
      dispatch(
        authLogin({
          userData: { ...user, name: data.name },
          profilePhoto: finalPhoto,
        })
      );
      dispatch(updateProfilePhoto(finalPhoto));

      alert("✅ Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("❌ Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="w-full flex items-center justify-center m-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[80%] space-y-4 border border-gray-300 dark:border-gray-800 rounded-xl p-6 bg-white dark:bg-gray-900 shadow-md"
      >
        <h2 className="text-xl font-semibold">Edit Profile</h2>

        <div className="w-full flex flex-col md:flex-row gap-6">

          {/* LEFT SIDE — Profile Photo */}
          <div className="md:w-full flex flex-col items-start gap-5">
            <img
              src={preview}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border"
              loading="lazy"
            />

            <div className="w-full">
              <input
                type="file"
                accept="image/*"
                {...register("image")}
                onChange={handleImageChange}
                className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2
                           outline-none focus:border-black dark:focus:border-gray-400 focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
              />
            </div>
          </div>

          {/* RIGHT SIDE — Name & Email */}
          <div className="md:w-full flex flex-col gap-5">

            {/* Name */}
            <div className="w-full">
              <input
                placeholder="Your Name"
                {...register("name", { required: "Name is required" })}
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md px-3 py-2 outline-none focus:border-black dark:focus:border-gray-400 focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email (read-only) */}
            <div className="w-full">
              <input
                value={user.email}
                disabled
                className="w-full border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 rounded-md px-3 py-2 text-gray-500 dark:text-gray-500"
              />
            </div>

          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 justify-end pt-4">
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md hover:opacity-80 active:scale-95 transition"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default EditProfile;
