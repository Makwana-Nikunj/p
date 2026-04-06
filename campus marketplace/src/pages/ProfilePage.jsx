import React, { useState, useEffect } from "react";
import ProfileCard from '../Components/profile/ProfileCard';
import OwnerProduct from '../Components/profile/OwnerProduct';
import { useSelector, useDispatch } from "react-redux";
import { fetchMyProducts } from '../store/productSlice';

const Profile = () => {
  const [activeTab, setActiveTab] = useState("my-listings");

  const dispatch = useDispatch();
  const myProducts = useSelector((state) => state.products.myProducts);
  const user = useSelector((state) => state.auth.userData);

  // Fetch user's products on mount
  useEffect(() => {
    if (user) {
      dispatch(fetchMyProducts());
    }
  }, [dispatch, user]);

  // Filter products by status
  const activeProducts = myProducts.filter((p) => p.listing_status === "active");
  const soldProducts = myProducts.filter((p) => p.listing_status === "sold");

  // Prevent crash if user not loaded yet
  if (!user) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="text-center space-y-4">
          <div className="inline-block">
            <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-lg font-semibold text-on-surface/80">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative">

      <div className="w-[95%] max-w-7xl mx-auto section-spacing">

        {/* Profile Card with glass effect */}
        <ProfileCard myProducts={myProducts} />

        {/* Tabs Interface - Underline style */}
        <section className="mb-16">
          <div className="border-b dark:border-white/10 border-gray-200 mb-8">
            <nav className="flex items-center gap-8 overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setActiveTab("my-listings")}
                className={`pb-4 text-lg font-headline font-bold transition-all duration-300 px-2 tab-indicator ${
                  activeTab === "my-listings"
                    ? "text-indigo-300 border-b-2 border-indigo-500"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                My Listings
              </button>

              <button
                onClick={() => setActiveTab("sold")}
                className={`pb-4 text-lg font-headline font-medium transition-all duration-300 px-2 tab-indicator ${
                  activeTab === "sold"
                    ? "text-indigo-300 border-b-2 border-indigo-500"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Sold Items
              </button>
            </nav>
          </div>

          {/* Content Grid */}
          <div className="min-h-[400px]">
            <OwnerProduct
              products={activeTab === "my-listings" ? activeProducts : soldProducts}
              showNewListing={activeTab === "my-listings"}
              emptyMessage={
                activeTab === "my-listings"
                  ? { title: "No active listings", message: "Start listing your items on the marketplace", icon: "📦" }
                  : { title: "No sold items yet", message: "Your completed sales will appear here", icon: "✓" }
              }
            />
          </div>
        </section>

      </div>
    </div>
  );
};

export default Profile;

