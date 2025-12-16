import React from "react"

import ProfileCard from "./ProfileCard"

const Profile = () => {
  return (
    <div className="w-full flex justify-center items-center py-12">
      <div className="w-[95%] mt-20 max-w-7xl">

        {/* Page Title */}
        <h1 className="text-3xl font-semibold mb-8">Profile</h1>

        {/* Profile Card */}
         <ProfileCard />

         <div className="w-full h-10 bg-black p-1 my-8 rounded-2xl flex justify-around ">

            <button className="bg-white w-[50%] rounded-2xl text-black cursor-pointer">Active Listings</button>
            <button className="text-white w-[50%] rounded-2xl cursor-pointer">Sold Items</button>

         </div>

         <div>

            {/* useing filter method display all listed product by user based one "active" or "sold" and use cart */}
         </div>
        
      </div>
    </div>
  )
}

export default Profile
