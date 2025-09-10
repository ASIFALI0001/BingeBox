export default function MovieCard({ movie, onClick }) {
  return (
    <div
      className="group relative bg-gradient-to-br from-gray-900/60 via-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-3xl overflow-hidden cursor-pointer transform-gpu transition-all duration-700 hover:scale-110 hover:-translate-y-4 hover:shadow-[0_25px_50px_rgba(99,102,241,0.4)] border border-gray-800/50 hover:border-indigo-400/60 perspective-1000"
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden'
      }}
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-indigo-500/20 group-hover:via-purple-500/15 group-hover:to-cyan-500/20 rounded-3xl transition-all duration-1000 blur-2xl transform group-hover:scale-150"></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
        <div className="absolute top-4 left-4 w-1 h-1 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000 group-hover:animate-ping"></div>
        <div className="absolute top-8 right-6 w-0.5 h-0.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1200 group-hover:animate-pulse" style={{animationDelay: '0.3s'}}></div>
        <div className="absolute bottom-12 left-8 w-0.5 h-0.5 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1400 group-hover:animate-bounce" style={{animationDelay: '0.6s'}}></div>
      </div>

      {/* Movie Poster with enhanced 3D effects */}
      <div className="aspect-[2/3] overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 relative transform-gpu transition-all duration-700 group-hover:rotateX-5">
        {movie.Poster && movie.Poster !== 'N/A' ? (
          <>
            <img 
              src={movie.Poster} 
              alt={`${movie.Title} poster`}
              className="w-full h-full object-cover transform-gpu transition-all duration-1000 group-hover:scale-125 group-hover:brightness-110 group-hover:contrast-110"
              style={{
                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))',
                transformOrigin: 'center center'
              }}
            />
            
            {/* Dynamic gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/20 to-transparent opacity-60 group-hover:opacity-90 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-transparent group-hover:from-indigo-500/20 group-hover:via-purple-500/10 transition-all duration-1000" />
            
            {/* Animated scan lines */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent transform translate-y-full group-hover:translate-y-[-100%] transition-transform duration-2000"></div>
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
            {/* Animated background for no poster */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            
            <div className="text-center text-gray-400 group-hover:text-indigo-400 transition-all duration-500 transform group-hover:scale-110 relative z-10">
              <div className="relative mb-3">
                <svg className="w-16 h-16 mx-auto transform transition-all duration-700 group-hover:rotate-12 group-hover:scale-125" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
                </svg>
                {/* Orbiting elements */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000">
                  <div className="absolute top-2 right-2 w-1 h-1 bg-indigo-400 rounded-full animate-ping" style={{animationDelay: '0s'}}></div>
                  <div className="absolute bottom-2 left-2 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute top-1/2 right-0 w-0.5 h-0.5 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
              </div>
              <p className="text-sm font-bold tracking-wide transform transition-all duration-500 group-hover:scale-105">
                NO POSTER
              </p>
            </div>
          </div>
        )}
        
        {/* Enhanced play button with 3D effect */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-100 scale-75">
          <div className="relative">
            {/* Multiple glow layers */}
            <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl scale-150 animate-pulse"></div>
            <div className="absolute inset-0 bg-indigo-500/30 rounded-full blur-xl scale-125 animate-pulse" style={{animationDelay: '0.5s'}}></div>
            
            <div className="relative bg-white/15 backdrop-blur-2xl rounded-full p-5 border border-white/30 transform transition-all duration-500 hover:scale-125 hover:rotate-12 shadow-2xl group-hover:shadow-white/20">
              <svg className="w-10 h-10 text-white transform transition-all duration-300 hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              
              {/* Ripple effect */}
              <div className="absolute inset-0 rounded-full border-2 border-white/50 scale-100 animate-ping opacity-75"></div>
            </div>
          </div>
        </div>

        {/* Enhanced type badge with 3D effect */}
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-2 group-hover:translate-y-0">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/50 to-purple-500/50 rounded-2xl blur-lg scale-110"></div>
            <span className="relative bg-gradient-to-r from-indigo-600/90 to-purple-600/90 backdrop-blur-xl text-white text-xs px-4 py-2 rounded-2xl font-bold border border-indigo-400/50 shadow-xl transform transition-all duration-300 hover:scale-110 hover:-translate-y-1 block">
              ✨ {movie.Type?.toUpperCase() || 'MOVIE'}
            </span>
          </div>
        </div>

        {/* Corner accent decorations */}
        <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0">
          <div className="w-full h-full bg-gradient-to-bl from-cyan-400/80 to-transparent rounded-bl-2xl"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-700 transform -translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0">
          <div className="w-full h-full bg-gradient-to-tr from-pink-400/80 to-transparent rounded-tr-2xl"></div>
        </div>
      </div>

      {/* Enhanced Movie Info with floating effect */}
      <div className="relative p-4 sm:p-5 bg-gradient-to-t from-gray-900/95 via-gray-800/60 to-gray-900/80 backdrop-blur-xl transform transition-all duration-700 group-hover:-translate-y-1">
        {/* Floating glow under text */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/5 group-hover:to-cyan-500/10 transition-all duration-1000 rounded-b-3xl"></div>
        
        <div className="relative z-10">
          <h3 className="font-bold text-white text-sm sm:text-base mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-indigo-200 group-hover:to-purple-200 group-hover:bg-clip-text transition-all duration-500 leading-tight transform group-hover:scale-105">
            {movie.Title}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300">📅</span>
              <p className="text-gray-400 group-hover:text-gray-300 text-sm font-semibold transition-all duration-300 transform group-hover:scale-105">
                {movie.Year}
              </p>
            </div>
            
            <div className="flex items-center gap-1.5 text-yellow-400 text-xs group-hover:text-yellow-300 transition-all duration-300 transform group-hover:scale-110 hover:scale-125">
              <svg className="w-4 h-4 transform transition-all duration-500 group-hover:rotate-180 group-hover:scale-125" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span className="font-bold tracking-wide">IMDb</span>
            </div>
          </div>
          
          {/* Category/Genre info if available */}
          {(movie.category || movie.genre) && (
            <div className="mt-3 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
              {movie.category && (
                <span className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm text-indigo-300 text-xs px-3 py-1.5 rounded-full font-medium border border-indigo-400/30 hover:scale-110 transition-transform duration-300">
                  {movie.category}
                </span>
              )}
              {movie.genre && (
                <span className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm text-purple-300 text-xs px-3 py-1.5 rounded-full font-medium border border-purple-400/30 hover:scale-110 transition-transform duration-300">
                  {movie.genre}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Enhanced floating border effect */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-500/20 via-purple-500/10 to-pink-500/20 animate-pulse"></div>
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-bl from-cyan-500/15 via-transparent to-yellow-500/15" style={{animation: 'gradient-shift 4s ease-in-out infinite'}}></div>
      </div>

      {/* Magic sparkle effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        {/* Sparkles */}
        <div className="absolute top-6 right-8 opacity-0 group-hover:opacity-100 transition-all duration-1000" style={{animationDelay: '0.2s'}}>
          <div className="w-1 h-1 bg-white rounded-full animate-ping"></div>
        </div>
        <div className="absolute top-16 left-6 opacity-0 group-hover:opacity-100 transition-all duration-1200" style={{animationDelay: '0.5s'}}>
          <div className="w-0.5 h-0.5 bg-indigo-400 rounded-full animate-pulse"></div>
        </div>
        <div className="absolute bottom-20 right-4 opacity-0 group-hover:opacity-100 transition-all duration-800" style={{animationDelay: '0.8s'}}>
          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"></div>
        </div>
        <div className="absolute bottom-32 left-3 opacity-0 group-hover:opacity-100 transition-all duration-1500" style={{animationDelay: '1s'}}>
          <div className="w-0.5 h-0.5 bg-cyan-400 rounded-full animate-ping"></div>
        </div>

        {/* Floating light rays */}
        <div className="absolute top-0 left-1/2 w-px h-8 bg-gradient-to-b from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000 transform -translate-x-1/2 scale-y-0 group-hover:scale-y-100" style={{animationDelay: '0.3s'}}></div>
        <div className="absolute bottom-0 right-1/4 w-px h-6 bg-gradient-to-t from-indigo-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-800 transform scale-y-0 group-hover:scale-y-100" style={{animationDelay: '0.6s'}}></div>
      </div>

      {/* Enhanced reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-all duration-1000 rounded-3xl transform group-hover:translate-x-1 group-hover:-translate-y-1"></div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { 
            background-position: 0% 50%; 
            opacity: 0.1;
          }
          25% { 
            background-position: 100% 50%; 
            opacity: 0.3;
          }
          50% { 
            background-position: 50% 100%; 
            opacity: 0.2;
          }
          75% { 
            background-position: 0% 100%; 
            opacity: 0.25;
          }
        }
        
        @keyframes rotateX-5 {
          to { transform: rotateX(5deg); }
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-gpu {
          transform: translateZ(0);
        }
        
        .group:hover .group-hover\\:rotateX-5 {
          transform: rotateX(5deg);
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Custom 3D transformations */
        .group:hover {
          transform: translateZ(0) scale(1.1) translateY(-16px) rotateY(2deg);
        }
        
        /* Enhance the glow effect */
        .group:hover::before {
          content: '';
          position: absolute;
          inset: -20px;
          background: radial-gradient(circle at center, rgba(99,102,241,0.15) 0%, transparent 70%);
          border-radius: 50%;
          z-index: -1;
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}