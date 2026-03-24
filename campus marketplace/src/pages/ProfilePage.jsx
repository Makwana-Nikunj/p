import React, { useState, useEffect } from "react";
import ProfileCard from '../Components/profile/ProfileCard';
import OwnerProduct from '../Components/profile/OwnerProduct';
import { useSelector, useDispatch } from "react-redux";
import { fetchMyProducts } from '../store/productSlice';

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
    <div className="w-full flex justify-center items-center py-12">
      <div className="w-[95%] max-w-7xl">

        <h1 className="text-3xl font-semibold mb-8">Profile</h1>

        <ProfileCard />

        <div className="w-full h-10 bg-black dark:bg-gray-800 p-1 my-8 rounded-2xl flex justify-around">
          <button
            onClick={() => setActiveTab("active")}
            className={`w-[50%] rounded-2xl cursor-pointer ${
              activeTab === "active" ? "bg-white text-black" : "text-white dark:text-gray-300"
            }`}
          >
            Active Listings
          </button>

          <button
            onClick={() => setActiveTab("sold")}
            className={`w-[50%] rounded-2xl cursor-pointer ${
              activeTab === "sold" ? "bg-white text-black" : "text-white dark:text-gray-300"
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
