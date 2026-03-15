import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfileCard = () => {
  const user = useSelector((state) => state.auth.userData);
  const products = useSelector((state) => state.products.products);
  const navigate = useNavigate();
  // Profile Photo from Redux store because editing updates it there
  const profilePhoto = useSelector((state) => state.auth.profilePhoto);
 

  if (!user) return null;

 
    

  // Stats
  const ownerProducts = products.filter((p) => String(p.userId) === String(user.$id));
  const activeCount = ownerProducts.filter((p) => p.status === "approved" || p.status === "pending").length;
  const soldCount = ownerProducts.filter((p) => p.status === "sold").length;

  return (
    <div className="border border-gray-200 rounded-2xl p-8 space-y-8 min-h-[350px] bg-white">

      {/* Top Section */}
      <div className="flex flex-col sm:flex-row gap-8">

        {/* Avatar */}
        <img
          src={profilePhoto || user?.avatar || "https://img.freepik.com/free-icon/user_318-159711.jpg"}
          alt="Profile"
          className="w-40 h-40 rounded-full object-cover border"
        />

        {/* Info */}
        <div className="flex-1  space-y-4">

          <div className="flex items-start justify-between">
            <div className="space-y-1 flex flex-col gap-5 justify-between items-start">
              <h2 className="text-2xl font-semibold">{user.name || "User"}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>

            {/* Edit Button */}
            <button
              className="flex items-center gap-2 text-sm font-medium px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-200 transition cursor-pointer"
              onClick={() => navigate("/profile/edit")}
            >
              <FiEdit2 />
              Edit Profile
            </button>
          </div>

        </div>
      </div>

      <hr />

      {/* Stats */}
      <div className="flex justify-around text-center">
        <div>
          <p className="text-2xl font-semibold">{activeCount}</p>
          <p className="text-sm text-gray-500">Listings</p>
        </div>
        <div>
          <p className="text-2xl font-semibold">{soldCount}</p>
          <p className="text-sm text-gray-500">Sold</p>
        </div>
      </div>

    </div>
  );
};

export default ProfileCard;
