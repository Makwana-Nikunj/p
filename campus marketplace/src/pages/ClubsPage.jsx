import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../Components/home/Hero'
import FeaturesMarquee from '../Components/home/FeaturesMarquee'

const ClubsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all')

  const clubs = [
    {
      id: 1,
      name: "Robotics Club",
      category: "Technology",
      members: 120,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgSKMl40J-cyLpJA6gxpQehXGuB74BqurJmIg_WkBeyf_XXERJCloPXhrE4392tnyhFAys7M-69reXCYoVkKC2yO0LeDXzFOpLgS9ZgIeZhiYfYJ5WLXHCxhiCfH8ufq-It7Q2T_tuujYpkQo_vJrFvdVnVS5G75ViIIKuw9ZwZ0wW-kotfVuHB1n4CGtYmpXAgVCpr0txEH0BAYN6Rirsh40BkME2lyGeOpwl1PYX4b_1I3n4_iP2qnCvM3T0PB3VJ-Sido5NiBrd",
      description: "Build robots, compete in national championships, and learn from industry experts.",
      tags: ["AI", "Hardware", "Competitions"],
      color: "indigo"
    },
    {
      id: 2,
      name: "Photography Society",
      category: "Arts",
      members: 85,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdBpuQe0dY3rNqyTcBnPq6Auv0UMbP0_jxzmJrygmn7E4bryVW0661JDtkcnhS1xVHByRiDygnrGX8DeuVvT0Wu42x4llPY1ejKQKneDI3stbRD64ELMQdtTDZxQ1gj5rXOOHTkeV_rVZuv6j4EEKcj4X0KU2h9U0_HIt5GSyhroAAjEjcWi25GVcxh8i8gGN4_Jjz2brVuT93yC8--w2QnsD5akddVTbJbdAZUeNuzKDKh7diWSbN7g_oiv34EkqSDnqZpBxCvMRr",
      description: "Capture moments, master lighting, and showcase your work in annual exhibitions.",
      tags: [" DSLR", "Editing", "Exhibitions"],
      color: "cyan"
    },
    {
      id: 3,
      name: "Entrepreneurship Cell",
      category: "Business",
      members: 150,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtqgBOs1x7IDn7R9IkhmySMw6bKgRM1J_kVBqV3jkvGPgRrWnE9Kg-GFaTRLFk5jG96uptMMipw6iVMLlgkVRXsF4lIU2XBYDM4q2FOEtj3RFEDHYgHW9I6Ahqe2qJLwssxC8zEH3O3Ar_su6FPxYHggnLnokkhurNi7T_5YMFvmeJE1apsXvJ2ILAclRe3mzhVBuH4PQ_zu4c08FjKGS7nnlJLkUvlww5sAkLSwPFMogXQR5KBvOCaCimwSal3PgjFkUDc0-ApWem",
      description: "Turn your ideas into startups. Get mentorship, funding, and network with founders.",
      tags: ["Startups", "Pitch", "Mentorship"],
      color: "violet"
    },
    {
      id: 4,
      name: "Debate Union",
      category: "Academic",
      members: 65,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgSKMl40J-cyLpJA6gxpQehXGuB74BqurJmIg_WkBeyf_XXERJCloPXhrE4392tnyhFAys7M-69reXCYoVkKC2yO0LeDXzFOpLgS9ZgIeZhiYfYJ5WLXHCxhiCfH8ufq-It7Q2T_tuujYpkQo_vJrFvdVnVS5G75ViIIKuw9ZwZ0wW-kotfVuHB1n4CGtYmpXAgVCpr0txEH0BAYN6Rirsh40BkME2lyGeOpwl1PYX4b_1I3n4_iP2qnCvM3T0PB3VJ-Sido5NiBrd",
      description: "Sharpen your argumentation skills and compete in inter-college debates.",
      tags: ["Public Speaking", "Logic", "Competitions"],
      color: "indigo"
    },
    {
      id: 5,
      name: "Environmental Action",
      category: "Social",
      members: 95,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdBpuQe0dY3rNqyTcBnPq6Auv0UMbP0_jxzmJrygmn7E4bryVW0661JDtkcnhS1xVHByRiDygnrGX8DeuVvT0Wu42x4llPY1ejKQKneDI3stbRD64ELMQdtTDZxQ1gj5rXOOHTkeV_rVZuv6j4EEKcj4X0KU2h9U0_HIt5GSyhroAAjEjcWi25GVcxh8i8gGN4_Jjz2brVuT93yC8--w2QnsD5akddVTbJbdAZUeNuzKDKh7diWSbN7g_oiv34EkqSDnqZpBxCvMRr",
      description: "Make campus greener. Organize clean-ups, plant trees, and advocate for sustainability.",
      tags: ["Sustainability", "Activism", "Community"],
      color: "cyan"
    },
    {
      id: 6,
      name: "Music Collective",
      category: "Arts",
      members: 110,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtqgBOs1x7IDn7R9IkhmySMw6bKgRM1J_kVBqV3jkvGPgRrWnE9Kg-GFaTRLFk5jG96uptMMipw6iVMLlgkVRXsF4lIU2XBYDM4q2FOEtj3RFEDHYgHW9I6Ahqe2qJLwssxC8zEH3O3Ar_su6FPxYHggnLnokkhurNi7T_5YMFvmeJE1apsXvJ2ILAclRe3mzhVBuH4PQ_zu4c08FjKGS7nnlJLkUvlww5sAkLSwPFMogXQR5KBvOCaCimwSal3PgjFkUDc0-ApWem",
      description: "Jam sessions, open mics, and collaborations. All genres welcome!",
      tags: ["Jams", "Collaboration", "Performances"],
      color: "violet"
    }
  ]

  const filters = [
    { id: 'all', label: 'All Clubs', count: clubs.length },
    { id: 'Technology', label: 'Technology', count: clubs.filter(c => c.category === 'Technology').length },
    { id: 'Arts', label: 'Arts', count: clubs.filter(c => c.category === 'Arts').length },
    { id: 'Business', label: 'Business', count: clubs.filter(c => c.category === 'Business').length },
    { id: 'Academic', label: 'Academic', count: clubs.filter(c => c.category === 'Academic').length },
    { id: 'Social', label: 'Social', count: clubs.filter(c => c.category === 'Social').length }
  ]

  const colorClasses = {
    indigo: {
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/20',
      text: 'text-indigo-400',
      button: 'bg-gradient-to-r from-indigo-600 to-indigo-500'
    },
    violet: {
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/20',
      text: 'text-violet-400',
      button: 'bg-gradient-to-r from-violet-600 to-violet-500'
    },
    cyan: {
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
      text: 'text-cyan-400',
      button: 'bg-gradient-to-r from-cyan-600 to-cyan-500'
    }
  }

  return (
    <div className='w-full flex flex-col items-center relative'>
      {/* Hero Section */}
      <Hero />

      {/* Features Marquee */}
      <FeaturesMarquee />

      {/* Clubs Header */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-bold text-xs uppercase tracking-widest mb-4 backdrop-blur-sm">
            Campus Community
          </span>
          <h1 className="font-headline text-4xl md:text-5xl font-extrabold mb-4 gradient-text bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
            Student Clubs & Organizations
          </h1>
          <p className="text-gray-300/70 max-w-2xl mx-auto text-lg">
            Find your tribe. Join communities that match your passions and make your campus experience unforgettable.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-[0_0_20px_-5px_rgba(99,102,241,0.5)]'
                  : 'glass-card text-gray-300 hover:border-indigo-500/30'
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>

        {/* Clubs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {clubs
            .filter(club => activeFilter === 'all' || club.category === activeFilter)
            .map((club, index) => (
              <div
                key={club.id}
                className="perspective-container group"
                style={{ perspective: '1000px' }}
              >
                <div className="tilt-card glass-card rounded-3xl overflow-hidden relative transition-all duration-500 hover:border-indigo-500/40">
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 ${colorClasses[club.color].bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>

                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={club.image}
                      alt={club.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${colorClasses[club.color].bg} ${colorClasses[club.color].border} border`}>
                        {club.category}
                      </span>
                    </div>

                    {/* Members Badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm bg-surface-container-highest/80 border border-white/10`}>
                        {club.members} members
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-headline font-extrabold text-xl mb-2 text-gray-100">{club.name}</h3>
                    <p className="text-sm text-gray-400/80 mb-6 leading-relaxed">{club.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {club.tags.map((tag, i) => (
                        <span
                          key={i}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${colorClasses[club.color].bg} ${colorClasses[club.color].text}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 ${colorClasses[club.color].button} text-white hover:shadow-[0_0_20px_-5px_rgba(99,102,241,0.4)] active:scale-95`}>
                      Join Club
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Empty State */}
        {clubs.filter(club => activeFilter === 'all' || club.category === activeFilter).length === 0 && (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-6xl text-gray-600 mb-4 block">search_off</span>
            <h3 className="font-headline text-2xl font-bold text-gray-400 mb-2">No clubs found</h3>
            <p className="text-gray-500">Try selecting a different category</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 mb-20">
        <div className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full -mr-24 -mt-24"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 blur-[100px] rounded-full -ml-20 -mb-20"></div>

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="font-headline text-3xl md:text-4xl font-extrabold mb-4 gradient-text bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              Start Your Own Club?
            </h2>
            <p className="text-gray-300/70 text-lg mb-8 leading-relaxed">
              Have an idea for a new organization? Lumina supports student-led initiatives with resources, funding connections, and promotion.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold hover:scale-105 transition-all duration-300 shadow-[0_0_30px_-5px_rgba(99,102,241,0.5)]">
                Propose a Club
              </button>
              <button className="px-8 py-4 rounded-full border border-indigo-500/30 text-gray-200 font-bold hover:bg-indigo-500/10 transition-all duration-300 backdrop-blur-sm">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ClubsPage
