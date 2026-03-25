import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfileCard = ({ myProducts }) => {
  const user = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  // Profile Photo from Redux store because editing updates it there
  const profilePhoto = useSelector((state) => state.auth.profilePhoto);
 

  if (!user) return null;

 
    

  // Stats - myProducts already filtered for current user
  const activeCount = myProducts.filter((p) => p.listing_status === "active").length;
  const soldCount = myProducts.filter((p) => p.listing_status === "sold").length;

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-8 space-y-8 min-h-[350px] bg-white dark:bg-gray-900 shadow-sm">

      {/* Top Section */}
      <div className="flex flex-col sm:flex-row gap-8">

        {/* Avatar */}
        <img
          src={profilePhoto || user?.avatar || "https://img.freepik.com/free-icon/user_318-159711.jpg"}
          alt="Profile"
          className="w-40 h-40 rounded-full object-cover border"
          loading="lazy"
        />

        {/* Info */}
        <div className="flex-1  space-y-4">

          <div className="flex items-start justify-between">
            <div className="space-y-1 flex flex-col gap-5 justify-between items-start">
              <h2 className="text-2xl font-semibold dark:text-white">{user.name || "User"}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>

            {/* Edit Button */}
            <button
              className="flex items-center gap-2 text-sm font-medium px-4 py-2 border border-gray-300 dark:border-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition cursor-pointer"
              onClick={() => navigate("/profile/edit")}
            >
              <FiEdit2 />
              Edit Profile
            </button>
          </div>

        </div>
      </div>

      <hr className="border-gray-200 dark:border-gray-800" />

      {/* Stats */}
      <div className="flex justify-around text-center">
        <div>
          <p className="text-2xl font-semibold dark:text-white">{activeCount}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Listings</p>
        </div>
        <div>
          <p className="text-2xl font-semibold dark:text-white">{soldCount}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Sold</p>
        </div>
      </div>

    </div>
  );
};

export default ProfileCard;
