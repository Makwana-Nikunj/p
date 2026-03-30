import React from 'react'

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      quote: "Lumina helped me find a high-end drawing tablet for half the price. The face-to-face exchange on campus made me feel incredibly safe.",
      name: "Priya Patel",
      role: "Design Major",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgSKMl40J-cyLpJA6gxpQehXGuB74BqurJmIg_WkBeyf_XXERJCloPXhrE4392tnyhFAys7M-69reXCYoVkKC2yO0LeDXzFOpLgS9ZgIeZhiYfYJ5WLXHCxhiCfH8ufq-It7Q2T_tuujYpkQo_vJrFvdVnVS5G75ViIIKuw9ZwZ0wW-kotfVuHB1n4CGtYmpXAgVCpr0txEH0BAYN6Rirsh40BkME2lyGeOpwl1PYX4b_1I3n4_iP2qnCvM3T0PB3VJ-Sido5NiBrd",
      accentColor: "text-indigo-400"
    },
    {
      id: 2,
      quote: "The textbook exchange is a lifesaver. I sold my old Engineering books in just two hours and bought the next semester's for cheap.",
      name: "Rahul Verma",
      role: "Mechanical Eng.",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdBpuQe0dY3rNqyTcBnPq6Auv0UMbP0_jxzmJrygmn7E4bryVW0661JDtkcnhS1xVHByRiDygnrGX8DeuVvT0Wu42x4llPY1ejKQKneDI3stbRD64ELMQdtTDZxQ1gj5rXOOHTkeV_rVZuv6j4EEKcj4X0KU2h9U0_HIt5GSyhroAAjEjcWi25GVcxh8i8gGN4_Jjz2brVuT93yC8--w2QnsD5akddVTbJbdAZUeNuzKDKh7diWSbN7g_oiv34EkqSDnqZpBxCvMRr",
      accentColor: "text-cyan-400"
    },
    {
      id: 3,
      quote: "The UI is actually beautiful. It doesn't feel like a sketchy marketplace; it feels like a premium social space for our college community.",
      name: "Kabir Das",
      role: "Psychology Junior",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtqgBOs1x7IDn7R9IkhmySMw6bKgRM1J_kVBqV3jkvGPgRrWnE9Kg-GFaTRLFk5jG96uptMMipw6iVMLlgkVRXsF4lIU2XBYDM4q2FOEtj3RFEDHYgHW9I6Ahqe2qJLwssxC8zEH3O3Ar_su6FPxYHggnLnokkhurNi7T_5YMFvmeJE1apsXvJ2ILAclRe3mzhVBuH4PQ_zu4c08FjKGS7nnlJLkUvlww5sAkLSwPFMogXQR5KBvOCaCimwSal3PgjFkUDc0-ApWem",
      accentColor: "text-violet-400"
    }
  ]

  return (
    <section className="bg-[#060E20] py-20 md:py-24 relative overflow-hidden">
      {/* Atmospheric background blooms */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/8 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/8 blur-[90px] rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-500/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-headline text-3xl md:text-4xl font-extrabold mb-4 gradient-text bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
            Student Voices
          </h2>
          <p className="text-gray-300/70 max-w-xl mx-auto leading-relaxed">
            Real experiences from students who've transformed their campus journey through Lumina.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="perspective-container group">
              <div className="tilt-card glass-card p-6 md:p-8 rounded-3xl relative" style={{ animationDelay: `${index * 100}ms` }}>
                {/* Gradient border on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

                {/* Quote Icon with glow */}
                <span className={`material-symbols-outlined text-4xl md:text-5xl opacity-15 absolute top-4 right-4 md:top-6 md:right-6 ${testimonial.accentColor} blur-sm`}>
                  format_quote
                </span>

                {/* Star Rating with accent colors */}
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`material-symbols-outlined text-lg ${testimonial.accentColor}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  ))}
                </div>

                {/* Quote - better typography */}
                <p className="text-base md:text-lg leading-relaxed mb-8 text-gray-200/90 font-light">
                  "{testimonial.quote}"
                </p>

                {/* Author with enhanced avatar */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-indigo-500/40 relative group-avatar">
                    {/* Avatar glow ring */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <img
                      src={testimonial.avatarUrl}
                      alt={testimonial.name}
                      className="w-full h-full object-cover relative z-10"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-base text-gray-100">{testimonial.name}</div>
                    <div className="text-xs text-gray-400/80">{testimonial.role}</div>
                  </div>
                </div>

                {/* Subtle accent line bottom */}
                <div className={`absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r ${testimonial.accentColor.replace('text-', 'from-')}/30 to-transparent rounded-full opacity-50`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
