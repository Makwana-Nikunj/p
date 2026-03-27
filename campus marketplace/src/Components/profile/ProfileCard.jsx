import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfileCard = ({ myProducts }) => {
  const user = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const profilePhoto = useSelector((state) => state.auth.profilePhoto);

  if (!user) return null;

  // Stats - myProducts already filtered for current user
  const activeCount = myProducts.filter((p) => p.listing_status === "active").length;
  const soldCount = myProducts.filter((p) => p.listing_status === "sold").length;

  return (
    <div className="relative mb-12">

      {/* Decorative radial gradient behind avatar */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[150%] h-64 blur-3xl opacity-30 -z-10" style={{
        background: 'radial-gradient(circle at center, rgba(236, 72, 153, 0.1) 0%, transparent 70%)'
      }}></div>

      {/* Profile Header */}
      <header className="flex flex-col md:flex-row gap-8 items-start md:items-end relative">

        {/* Avatar with gradient border glow */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-secondary rounded-[2rem] blur opacity-25 group-hover:opacity-50 group-hover:blur-md transition-all duration-500"></div>
          <img
            src={profilePhoto || user?.avatar || "https://img.freepik.com/free-icon/user_318-159711.jpg"}
            alt={user.name || "Profile"}
            className="relative w-32 h-32 md:w-40 md:h-40 rounded-[1.8rem] object-cover border-2 border-white/10 transition-all duration-500"
            loading="lazy"
          />
        </div>

        {/* Info Section */}
        <div className="flex-1 space-y-3">

          <div className="flex flex-wrap items-center gap-4">
            <h1 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight text-white">{user.name || "User"}</h1>
            {user.isPro && (
              <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold tracking-widest uppercase">PRO SELLER</span>
            )}
          </div>

          <p className="text-[#94A3B8] font-medium text-lg">
            {user.education || user.role || "Campus Member"}
          </p>

        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl glass font-semibold text-white hover:bg-white/10 transition-all duration-300 border border-subtle"
            onClick={() => navigate("/profile/edit")}
          >
            <FiEdit2 className="text-lg" />
            <span>Edit Profile</span>
          </button>
        </div>

      </header>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 mb-12">
        <div className="glass-card p-6 rounded-3xl border border-subtle flex flex-col justify-between h-32 hover:translate-y-[-4px] transition-transform duration-300">
          <span className="text-[#94A3B8] text-xs font-bold uppercase tracking-widest">Items Sold</span>
          <span className="text-3xl font-headline font-black text-secondary">{soldCount}</span>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-subtle flex flex-col justify-between h-32 hover:translate-y-[-4px] transition-transform duration-300">
          <span className="text-[#94A3B8] text-xs font-bold uppercase tracking-widest">Active Listings</span>
          <span className="text-3xl font-headline font-black text-tertiary">{activeCount}</span>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-subtle flex flex-col justify-between h-32 hover:translate-y-[-4px] transition-transform duration-300">
          <span className="text-[#94A3B8] text-xs font-bold uppercase tracking-widest">Member Since</span>
          <span className="text-2xl font-headline font-black text-white">{user.joinedDate || "2024"}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;