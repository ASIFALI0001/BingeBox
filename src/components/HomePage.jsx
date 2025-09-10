import CategoryCard from './CategoryCard';

export default function HomePage({ setCurrentPage, setSelectedGenre, setSelectedCategory }) {
  const categories = [
    {
      id: 'movies',
      title: 'Movies',
      icon: '🎬',
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=400&h=300&crop=center',
      description: 'Blockbusters, Indies & Classics',
      subtitle: 'Cinema Magic',
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 'webseries',
      title: 'Web Series',
      icon: '📺',
      image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400&h=300&fit=crop&crop=center',
      description: 'Binge-worthy Shows & Originals',
      subtitle: 'Streaming Paradise',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'anime',
      title: 'Anime',
      icon: '🎌',
      image: 'https://images.unsplash.com/photo-1613376023733-0a73315d9b06?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=400&h=300&fit=crop&crop=center',
      description: 'Japanese Animation & Manga',
      subtitle: 'Otaku Universe',
      color: 'from-pink-500 to-cyan-500'
    }
  ];

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(categoryId);

    // 🔹 Push URL to history so Back button works
    window.history.pushState({ page: categoryId }, "", `/${categoryId}`);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950/20 to-purple-950/30 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-full blur-3xl animate-spin" style={{ animationDuration: '30s' }}></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-cyan-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '20s' }}></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-yellow-500/3 to-orange-500/3 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '25s' }}></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-ping"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 15}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: '4s'
            }}
          ></div>
        ))}
      </div>

      {/* Enhanced Hero Section */}
      <div className="relative text-center py-16 sm:py-24 px-4 z-10">
        <div className="max-w-5xl mx-auto">
          {/* Floating logo/icon */}
          <div className="mb-8 relative inline-block group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-full blur-2xl scale-150 animate-pulse"></div>
            <div className="relative text-8xl sm:text-9xl transform transition-all duration-1000 hover:scale-125 hover:rotate-12 cursor-pointer animate-bounce" style={{ animationDuration: '3s' }}>
              🎭
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-6 transform transition-all duration-1000 hover:scale-105 leading-tight"
            style={{
              textShadow: '0 0 40px rgba(99,102,241,0.3)',
              backgroundSize: '200% 200%',
              animation: 'gradient-flow 6s ease-in-out infinite'
            }}>
            Welcome to MovieMate
          </h1>

          <div className="space-y-4 mb-8">
            <p className="text-xl sm:text-2xl text-transparent bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text font-bold transform transition-all duration-700 hover:scale-110">
              🎭 Your Ultimate Entertainment Companion 🎭
            </p>
            <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
              Discover, organize, and track your favorite movies, web series, and anime all in one place.<br />
              <span className="text-indigo-300">Create your personal entertainment library and never forget what to watch next!</span>
            </p>
          </div>

          <div className="space-y-3 mb-12">
            <div className="flex justify-center items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-indigo-400/30 hover:scale-110 transition-all duration-300">
                <span className="text-xl animate-bounce" style={{ animationDelay: '0.5s' }}>✨</span>
                <span className="text-indigo-200 font-bold">"Where every frame tells a story"</span>
                <span className="text-xl animate-bounce" style={{ animationDelay: '1s' }}>✨</span>
              </div>
            </div>
            <p className="text-gray-400 font-medium">
              <span className="text-cyan-300">"Your cinematic journey starts here"</span>
              <span className="ml-2 animate-pulse">🎬</span>
            </p>
          </div>

          {/* Stats or features */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
            {[
              { icon: '🎯', label: 'Discover', color: 'from-red-400 to-orange-400' },
              { icon: '📚', label: 'Organize', color: 'from-indigo-400 to-purple-400' },
              { icon: '⭐', label: 'Track', color: 'from-cyan-400 to-pink-400' }
            ].map((feature, index) => (
              <div key={feature.label}
                className="group bg-gray-800/30 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50 hover:border-indigo-400/50 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 hover:shadow-xl"
                style={{ animationDelay: `${index * 200}ms` }}>
                <div className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">{feature.icon}</div>
                <div className={`text-sm font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}>
                  {feature.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Categories Section */}
      <div className="relative max-w-7xl mx-auto px-4 pb-20 sm:pb-32 z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text mb-4 transform transition-all duration-700 hover:scale-105">
            Choose Your Adventure
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent w-24"></div>
            <span className="text-indigo-400 text-xl animate-pulse">⚡</span>
            <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent w-24"></div>
          </div>
          <p className="text-gray-400 text-lg font-medium">Select a category to start building your collection</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="group relative perspective-1000 animate-fade-in-up"
              style={{
                animationDelay: `${index * 200}ms`,
                animationFillMode: 'both'
              }}
            >
              {/* Enhanced CategoryCard with 3D effects */}
              <div
                className="relative bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-xl rounded-3xl overflow-hidden cursor-pointer transform-gpu transition-all duration-700 hover:scale-110 hover:-translate-y-8 hover:rotateY-5 border border-gray-700/50 hover:border-indigo-400/60 shadow-2xl hover:shadow-[0_30px_60px_rgba(99,102,241,0.3)]"
                onClick={() => handleCategoryClick(category.id)}
                style={{
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden'
                }}
              >
                {/* Dynamic glow background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-20 transition-all duration-1000 blur-2xl scale-150`}></div>

                {/* Image section with parallax */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transform-gpu transition-all duration-1000 group-hover:scale-125 group-hover:brightness-110"
                    style={{
                      filter: 'contrast(1.1) saturate(1.2)',
                    }}
                  />

                  {/* Multiple overlay effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
                  <div className={`absolute inset-0 bg-gradient-to-tr ${category.color} opacity-0 group-hover:opacity-30 transition-all duration-1000`}></div>

                  {/* Animated scan effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1500"></div>
                  </div>

                  {/* Floating icon with 3D effect */}
                  <div className="absolute top-6 right-6 transform transition-all duration-700 group-hover:scale-125 group-hover:rotate-12 group-hover:-translate-y-2">
                    <div className="relative">
                      <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl scale-150 animate-pulse"></div>
                      <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-3 border border-white/30 shadow-2xl">
                        <span className="text-3xl block">{category.icon}</span>
                      </div>
                    </div>
                  </div>

                  {/* Category subtitle floating */}
                  <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-2 group-hover:translate-y-0">
                    <span className={`bg-gradient-to-r ${category.color} bg-clip-text text-transparent font-black text-sm tracking-wider`}>
                      {category.subtitle}
                    </span>
                  </div>
                </div>

                {/* Enhanced content section */}
                <div className="relative p-6 sm:p-8 bg-gradient-to-t from-gray-900/95 to-gray-800/80 backdrop-blur-xl">
                  {/* Floating glow under content */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-10 transition-all duration-1000 blur-xl`}></div>

                  <div className="relative z-10 space-y-4">
                    <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-indigo-200 group-hover:bg-clip-text transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-1">
                      {category.title}
                    </h3>

                    <p className="text-gray-400 group-hover:text-gray-300 text-base font-medium transition-all duration-500 transform group-hover:scale-105 leading-relaxed">
                      {category.description}
                    </p>

                    {/* Action button */}
                    <div className="pt-4">
                      <div className={`inline-flex items-center gap-3 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-100 px-6 py-3 rounded-2xl font-bold text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl border border-white/20`}>
                        <span className="text-lg">🚀</span>
                        <span>Explore Now</span>
                        <svg className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Corner decorative elements */}
                <div className="absolute top-0 left-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-all duration-700 transform -translate-x-8 -translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0">
                  <div className={`w-full h-full bg-gradient-to-br ${category.color} rounded-full blur-xl`}></div>
                </div>
                <div className="absolute bottom-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-x-6 translate-y-6 group-hover:translate-x-0 group-hover:translate-y-0">
                  <div className={`w-full h-full bg-gradient-to-tl ${category.color} rounded-full blur-lg`}></div>
                </div>

                {/* Ripple effect on click */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                  <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-active:opacity-30 transition-opacity duration-200 transform scale-0 group-active:scale-100`}></div>
                </div>

                {/* Floating border animation */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-indigo-500/50 group-hover:via-purple-500/50 group-hover:to-cyan-500/50 opacity-0 group-hover:opacity-100 transition-all duration-1000"
                  style={{
                    background: 'linear-gradient(45deg, transparent, transparent)',
                    backgroundClip: 'padding-box'
                  }}>
                </div>
              </div>

              {/* 3D shadow effect */}
              <div className="absolute inset-0 rounded-3xl bg-black/20 blur-2xl transform translate-y-8 scale-95 opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10"></div>
            </div>
          ))}
        </div>

        {/* Bottom decorative section */}
        <div className="mt-16 sm:mt-24 text-center">
          <div className="flex justify-center items-center gap-8 mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent w-32"></div>
            <div className="flex items-center gap-3 text-2xl">
              <span className="animate-bounce" style={{ animationDelay: '0s' }}>🎬</span>
              <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>📺</span>
              <span className="animate-bounce" style={{ animationDelay: '0.6s' }}>🎌</span>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent w-32"></div>
          </div>

          <p className="text-gray-500 text-lg font-medium max-w-2xl mx-auto">
            Join millions of entertainment enthusiasts in creating the perfect watchlist
          </p>

          {/* Floating achievement badges */}
          <div className="flex justify-center gap-4 mt-8 flex-wrap">
            {[
              { emoji: '🏆', text: 'Curator', delay: '0s' },
              { emoji: '🎖️', text: 'Explorer', delay: '0.3s' },
              { emoji: '👑', text: 'Connoisseur', delay: '0.6s' }
            ].map((badge, index) => (
              <div key={badge.text}
                className="group/badge bg-gray-800/40 backdrop-blur-sm rounded-2xl px-4 py-2 border border-gray-700/50 hover:border-indigo-400/50 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
                style={{ animationDelay: badge.delay }}>
                <div className="flex items-center gap-2">
                  <span className="text-xl group-hover/badge:animate-spin transition-transform duration-500">{badge.emoji}</span>
                  <span className="text-sm font-bold text-gray-300 group-hover/badge:text-indigo-300 transition-colors duration-300">{badge.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(40px) rotateX(-10deg);
          }
          to { 
            opacity: 1; 
            transform: translateY(0) rotateX(0deg);
          }
        }
        
        @keyframes gradient-flow {
          0%, 100% {
            background-position: 0% 50%;
          }
          25% {
            background-position: 100% 50%;
          }
          50% {
            background-position: 50% 100%;
          }
          75% {
            background-position: 100% 0%;
          }
        }
        
        @keyframes rotateY-5 {
          to { transform: rotateY(5deg); }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-gpu {
          transform: translateZ(0);
        }
        
        .group:hover .hover\\:rotateY-5 {
          transform: rotateY(5deg);
        }
        
        /* Custom 3D hover effect for cards */
        .group:hover > div {
          transform: translateZ(0) scale(1.1) translateY(-32px) rotateY(5deg) rotateX(2deg);
        }
        
        /* Enhanced glow effects */
        .group:hover::after {
          content: '';
          position: absolute;
          inset: -30px;
          background: radial-gradient(circle at center, rgba(99,102,241,0.2) 0%, transparent 70%);
          border-radius: 50%;
          z-index: -2;
          animation: pulse 3s ease-in-out infinite;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}