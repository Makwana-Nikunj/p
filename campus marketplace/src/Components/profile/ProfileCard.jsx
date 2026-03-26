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
    <div className="glass glass-intense rounded-2xl p-8 space-y-8 min-h-[350px] border border-subtle shadow-2xl">

      {/* Top Section */}
      <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">

        {/* Avatar */}
        <div className="relative group">
          <img
            src={profilePhoto || user?.avatar || "https://img.freepik.com/free-icon/user_318-159711.jpg"}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-2 border-indigo-500/50 shadow-lg shadow-indigo-500/20"
            loading="lazy"
          />
          <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-cyan-400 transition-all duration-500"></div>
        </div>

        {/* Info */}
        <div className="flex-1 space-y-4 w-full">

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <h2 className="font-card-title text-white">{user.name || "User"}</h2>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>

            {/* Edit Button */}
            <button
              className="flex items-center gap-2 text-sm font-medium px-5 py-2.5 btn-gradient-primary rounded-lg shadow-lg"
              onClick={() => navigate("/profile/edit")}
            >
              <FiEdit2 />
              Edit Profile
            </button>
          </div>

        </div>
      </div>

      <div className="divider"></div>

      {/* Stats */}
      <div className="flex justify-around text-center">
        <div className="group">
          <p className="text-3xl font-bold gradient-text">{activeCount}</p>
          <p className="text-sm text-gray-400">Listings</p>
        </div>
        <div className="group">
          <p className="text-3xl font-bold gradient-text">{soldCount}</p>
          <p className="text-sm text-gray-400">Sold</p>
        </div>
      </div>

    </div>
  );
};

export default ProfileCard;
