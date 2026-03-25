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
            className="flex items-start gap-4 p-6 glass border border-subtle tilt-card transition-all duration-300"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="p-3 bg-gradient-to-br from-indigo-500/20 to-cyan-400/20 rounded-xl text-indigo-400 group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </div>
            <div>
              <h3 className="font-bold text-lg text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
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