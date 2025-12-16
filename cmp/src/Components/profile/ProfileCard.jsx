import React from 'react'
import { FiEdit2 } from "react-icons/fi"

const ProfileCard = () => {
  return (
    <div className="border border-gray-200 rounded-2xl p-8 space-y-8 min-h-[350px] bg-white">

          {/* Top Section */}
          <div className="flex flex-col sm:flex-row gap-8">

            {/* Avatar */}
            <img
              src="https://imgs.search.brave.com/NlyaZVxHZK-ltv-9ZSB-Zi_4sYslTOaP_ghUuzVBCGU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9wbmctY2lyY2xl/LXByb2ZpbGUtcGlj/dHVyZS1zdGlja2Vy/LWJ1c2luZXNzLXdv/bWFuLXRyYW5zcGFy/ZW50LWJhY2tncm91/bmRfNTM4NzYtOTQ1/ODYzLmpwZz9zZW10/PWFpc19oeWJyaWQm/dz03NDAmcT04MA"
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border"
            />

            {/* Info */}
            <div className="flex-1 space-y-4">

              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold">Nikunj Makwana</h2>
                  <p className="text-sm text-gray-500">email@example.com</p>
                  <p className="text-sm text-gray-500">Ahmedabad, India</p>
                  <p className="text-sm text-gray-500">Joined Jan 2024</p>
                </div>

                {/* Edit Button */}
                <button className="flex items-center gap-2 text-sm font-medium px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-200 transition cursor-pointer" >
                  <FiEdit2 />
                  Edit Profile
                </button>
              </div>

              {/* Bio */}
              <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
                Description about the user. This section can include a short bio,
                interests, or details about the user's activity on the platform.
              </p>
            </div>
          </div>

          <hr />

          {/* Stats */}
          <div className="flex justify-around text-center">
            <div>
              <p className="text-2xl font-semibold">12</p>
              <p className="text-sm text-gray-500">Listings</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">5</p>
              <p className="text-sm text-gray-500">Sold</p>
            </div>
          </div>

        </div>

  )
}

export default ProfileCard  