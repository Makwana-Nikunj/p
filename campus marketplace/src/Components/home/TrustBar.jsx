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
    <div className="w-full max-w-7xl mx-auto mt-12 px-4 sm:px-6 perspective-1000">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trustItems.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transform hover:-translate-y-1 animate-tilt3d transition-all duration-300 group card-hover"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="p-3 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
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