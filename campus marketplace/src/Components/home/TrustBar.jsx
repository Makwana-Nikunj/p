import React from "react"
import { GraduationCap, MapPin, Star } from "lucide-react"

const TrustBar = () => {
  const trustItems = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Students only",
      description: "Verified student community - buy and sell with peers from your campus"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Meet & trade locally",
      description: "Safe in-person exchanges on campus or nearby locations"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Rated by peers",
      description: "Build trust through reviews and ratings from verified transactions"
    }
  ]

  return (
    <div className="w-full max-w-7xl mx-auto mt-10 px-4 sm:px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {trustItems.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl"
          >
            <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300">
              {item.icon}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrustBar