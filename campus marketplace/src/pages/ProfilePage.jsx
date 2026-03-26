import React, { useState, useEffect } from "react";
import ProfileCard from '../Components/profile/ProfileCard';
import OwnerProduct from '../Components/profile/OwnerProduct';
import { useSelector, useDispatch } from "react-redux";
import { fetchMyProducts } from '../store/productSlice';
import AtmosphericBlooms from '../Components/AtmosphericBlooms';

const Profile = () => {
  const [activeTab, setActiveTab] = useState("active");

  const dispatch = useDispatch();
  const myProducts = useSelector((state) => state.products.myProducts);
  const user = useSelector((state) => state.auth.userData);

  // 🔥 Prevent crash if user not loaded yet
  if (!user) {
    return (
      <div className="w-full flex justify-center items-center py-12">
        <p className="text-lg font-semibold">Loading profile...</p>
      </div>
    );
  }

  // Fetch user's products on mount
  useEffect(() => {
    dispatch(fetchMyProducts());
  }, [dispatch]);

  // myProducts already scoped to current user from backend
  const activeProducts = myProducts.filter((p) => p.listing_status === "active");
  const soldProducts = myProducts.filter((p) => p.listing_status === "sold");

  return (
    <div className="min-h-screen w-full flex justify-center items-center relative py-10">
      <AtmosphericBlooms intensity="subtle" />
      <div className="w-[95%] max-w-7xl section-spacing">

        <h1 className="font-section-headline gradient-text text-center mb-10">My Profile</h1>

        <ProfileCard myProducts={myProducts} />

        {/* Tab Switcher */}
        <div className="w-full glass p-1.5 rounded-2xl flex justify-around my-10 border border-subtle">
          <button
            onClick={() => setActiveTab("active")}
            className={`w-[50%] rounded-2xl cursor-pointer transition-all duration-300 ${
              activeTab === "active"
                ? "btn-gradient-primary text-white shadow-lg"
                : "text-gray-300 hover:bg-white/5"
            }`}
          >
            Active Listings
          </button>

          <button
            onClick={() => setActiveTab("sold")}
            className={`w-[50%] rounded-2xl cursor-pointer transition-all duration-300 ${
              activeTab === "sold"
                ? "btn-gradient-primary text-white shadow-lg"
                : "text-gray-300 hover:bg-white/5"
            }`}
          >
            Sold Items
          </button>
        </div>

        <OwnerProduct
          products={activeTab === "active" ? activeProducts : soldProducts}
        />

      </div>
    </div>
  );
};

export default Profile;
