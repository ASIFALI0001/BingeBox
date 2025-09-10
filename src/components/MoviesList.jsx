import { useState } from 'react';
import MovieCard from './MovieCard';

export default function MoviesList({ movies, setMovies, category, genre }) {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [notification, setNotification] = useState(null);

  // Show notification with auto-fade
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Search movie titles
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    fetch(`/api/movies?s=${encodeURIComponent(searchTerm)}`)
      .then(res => res.json())
      .then(data => {
        if (data.Search) {
          setSearchResults(data.Search);
          setError("");
        } else {
          setSearchResults([]);
          setError("Sorry, could not find the movie details.");
        }
      })
      .catch(err => {
        console.error("API error:", err);
        setError("Something went wrong. Please try again later.");
      })
      .finally(() => {
        setIsSearching(false);
      });
  };

  // Add selected movie to the specific category-genre combination
  const addMovieToHome = (movie) => {
    const movieWithCategory = { ...movie, category, genre };

    if (!movies.find(m => m.imdbID === movie.imdbID)) {
      setMovies([...movies, movieWithCategory]);
      showNotification(`✅ Successfully added ${movie.Title}`);
    }
    setSearchResults([]);
    setError("");
    setSearchTerm("");
  };

  // Remove movie from the current category+genre
  const removeMovie = (movieId, movieTitle) => {
    const updatedMovies = movies.filter(movie => movie.imdbID !== movieId);
    setMovies(updatedMovies);
    showNotification(`🗑️ Successfully removed ${movieTitle}`);
  };

  // Show full movie details
  const handleMovieClick = (id) => {
    fetch(`/api/movies?i=${encodeURIComponent(id)}`)
      .then(res => res.json())
      .then(data => {
        setSelectedMovie(data);
      })
      .catch(err => console.error("Movie details error:", err));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950/30 to-purple-950/20 relative overflow-hidden">
      {/* Success Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div className="bg-gray-800/90 backdrop-blur-xl border border-gray-700/50 text-green-400 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 transform transition-all duration-500 hover:scale-105">
            <span className="text-lg">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-full blur-3xl animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-cyan-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '15s' }}></div>
      </div>

      {/* Search Section */}
      <div className="sticky top-0 z-40 bg-gray-950/90 backdrop-blur-2xl border-b border-gray-800/50 shadow-2xl">
        <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <div className="relative group w-full sm:w-auto perspective-1000">
              {/* Floating glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-700 group-hover:scale-110 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-pink-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>

              <div className="relative transform-gpu transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-1">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="✨ Discover movies, series, anime..."
                  className="relative bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 focus:border-indigo-400/70 focus:shadow-[0_0_30px_rgba(99,102,241,0.3)] px-6 py-4 sm:py-5 rounded-2xl w-full sm:w-96 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all duration-500 text-center sm:text-left text-sm sm:text-base transform-gpu hover:shadow-[0_10px_40px_rgba(99,102,241,0.2)]"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                  style={{
                    textShadow: '0 0 10px rgba(255,255,255,0.1)',
                  }}
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-indigo-400 transition-all duration-300 group-hover:scale-110">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <button
              onClick={handleSearch}
              disabled={!searchTerm.trim() || isSearching}
              className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-500 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed px-8 py-4 sm:py-5 rounded-2xl font-bold transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 disabled:hover:scale-100 disabled:hover:translate-y-0 shadow-2xl hover:shadow-[0_20px_40px_rgba(99,102,241,0.4)] w-full sm:w-auto text-sm sm:text-base bg-size-200 animate-gradient-x overflow-hidden group"
              style={{
                backgroundSize: '200% 200%',
                textShadow: '0 0 10px rgba(255,255,255,0.3)',
              }}
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

              <div className="relative flex items-center justify-center gap-2">
                {isSearching ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span>Search</span>
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Error with enhanced animation */}
      {error && (
        <div className="text-center p-4 animate-fade-in">
          <div className="inline-flex items-center gap-3 bg-red-500/20 backdrop-blur-sm border border-red-500/30 text-red-400 px-6 py-4 rounded-2xl shadow-lg hover:shadow-red-500/20 transition-all duration-300 transform hover:scale-105">
            <span className="text-xl animate-bounce">⚠️</span>
            <span className="font-medium">{error}</span>
          </div>
        </div>
      )}

      {/* Search Results with 3D card effects */}
      {searchResults.length > 0 && (
        <div className="mx-4 mb-8 animate-fade-in-up">
          <div className="bg-gray-900/90 backdrop-blur-xl rounded-3xl border border-gray-700/50 overflow-hidden max-w-6xl mx-auto shadow-2xl hover:shadow-[0_25px_50px_rgba(0,0,0,0.5)] transition-all duration-700 transform hover:scale-[1.02]">
            <div className="bg-gradient-to-r from-indigo-600/30 via-purple-600/30 to-cyan-600/30 p-4 sm:p-6 border-b border-gray-700/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 animate-pulse"></div>
              <h3 className="relative text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>🎯</span>
                <span className="hidden sm:inline bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">Search Results - Click to Add</span>
                <span className="sm:hidden bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">Results - Tap to Add</span>
                <div className="ml-auto text-sm font-normal bg-indigo-500/20 px-3 py-1 rounded-full border border-indigo-400/30">
                  {searchResults.length} found
                </div>
              </h3>
            </div>

            <div className="p-4 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {searchResults.map((movie, index) => (
                  <div
                    key={movie.imdbID}
                    className="group relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 hover:from-gray-700/70 hover:to-gray-800/70 border border-gray-700/50 hover:border-indigo-400/60 rounded-2xl p-4 sm:p-5 cursor-pointer transition-all duration-500 transform hover:scale-105 hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(99,102,241,0.2)] backdrop-blur-sm perspective-1000"
                    onClick={() => addMovieToHome(movie)}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* Animated glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-indigo-500/20 group-hover:via-purple-500/20 group-hover:to-cyan-500/20 rounded-2xl transition-all duration-700 blur-xl"></div>

                    <div className="relative flex gap-4 sm:gap-5 z-10">
                      <div className="flex-shrink-0 relative group/poster">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl blur-md group-hover/poster:blur-lg transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                        {movie.Poster && movie.Poster !== "N/A" ? (
                          <img
                            src={movie.Poster}
                            alt={movie.Title}
                            className="relative w-16 h-24 sm:w-20 sm:h-30 object-cover rounded-xl border border-gray-600/50 shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-y-12 group-hover:shadow-2xl"
                            style={{
                              transformStyle: 'preserve-3d',
                              backfaceVisibility: 'hidden'
                            }}
                          />
                        ) : (
                          <div className="relative w-16 h-24 sm:w-20 sm:h-30 bg-gradient-to-br from-gray-700/80 to-gray-800/80 border border-gray-600/50 rounded-xl flex items-center justify-center backdrop-blur-sm transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-y-12">
                            <div className="text-gray-400 text-center">
                              <div className="text-2xl sm:text-3xl mb-1 animate-pulse">🎬</div>
                              <div className="text-xs hidden sm:block font-medium">No Image</div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0 space-y-2">
                        <h4 className="font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-500 line-clamp-2 text-sm sm:text-base transform group-hover:scale-105">
                          {movie.Title}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-all duration-300 font-medium">
                          📅 {movie.Year}
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="text-xs font-bold text-indigo-400 bg-indigo-400/20 backdrop-blur-sm px-3 py-1.5 rounded-full inline-block border border-indigo-400/30 group-hover:bg-indigo-400/30 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                            {movie.Type?.toUpperCase() || 'MOVIE'}
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
                            <span className="text-xs text-green-400 font-bold">+ ADD</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Ripple effect on click */}
                    <div className="absolute inset-0 rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 to-purple-500/0 group-active:from-indigo-500/30 group-active:to-purple-500/30 transition-all duration-200"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Movies Grid with staggered animations */}
      {movies.length > 0 ? (
        <div className="px-4 pb-12 relative z-10">
          <div className="max-w-8xl mx-auto">
            <div className="mb-8 text-center animate-fade-in">
              <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text mb-3">
                Your Collection
              </h2>
              <div className="flex items-center justify-center gap-3 text-gray-400">
                <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent w-20"></div>
                <p className="text-lg font-medium">
                  <span className="text-indigo-400 font-bold">{movies.length}</span> {movies.length === 1 ? 'masterpiece' : 'masterpieces'} in your library
                </p>
                <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent w-20"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4 sm:gap-6 lg:gap-8">
              {movies.map((movie, index) => (
                <div
                  key={movie.imdbID}
                  className="animate-fade-in-up relative group"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  {/* Remove Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeMovie(movie.imdbID, movie.Title);
                    }}
                    className="absolute top-2 right-2 z-20 bg-red-500/90 hover:bg-red-500 backdrop-blur-sm rounded-xl p-3 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-red-500/30 border border-red-400/50"
                    title={`Remove ${movie.Title}`}
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>

                  <div onClick={() => handleMovieClick(movie.imdbID)}>
                    <MovieCard movie={movie} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 sm:py-32 relative z-10 animate-fade-in">
          <div className="relative group">
            <div className="text-8xl sm:text-9xl mb-6 transform transition-all duration-700 group-hover:scale-110 group-hover:rotate-12 cursor-pointer">
              🎬
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-700 opacity-0 group-hover:opacity-100"></div>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text mb-4">
            Your Cinema Awaits
          </h3>
          <p className="text-gray-500 text-lg sm:text-xl max-w-md mx-auto leading-relaxed">
            Search and curate your perfect collection of movies, series, and anime!
          </p>
          <div className="mt-8 flex justify-center">
            <div className="h-1 w-32 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      )}

      {/* Enhanced Modal with 3D effects */}
      {selectedMovie && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl flex justify-center items-center z-50 p-4 animate-fade-in">
          <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-2xl rounded-3xl shadow-2xl w-full max-w-4xl text-white relative border border-gray-700/50 max-h-[90vh] overflow-y-auto transform animate-scale-in hover:shadow-[0_25px_50px_rgba(0,0,0,0.8)] transition-all duration-700">

            {/* Enhanced close button */}
            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute top-6 right-6 z-20 bg-black/60 hover:bg-red-500/80 rounded-full p-3 transition-all duration-300 transform hover:scale-110 hover:rotate-90 border border-gray-600/50 hover:border-red-400/50 group"
            >
              <span className="text-white text-xl leading-none group-hover:text-red-100 transition-colors">✕</span>
            </button>

            {/* Movie content with parallax effect */}
            <div className="relative">
              {selectedMovie.Poster && selectedMovie.Poster !== 'N/A' && (
                <div className="relative h-80 sm:h-96 overflow-hidden rounded-t-3xl">
                  <img
                    src={selectedMovie.Poster}
                    alt={selectedMovie.Title}
                    className="w-full h-full object-cover transform transition-all duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />

                  {/* Floating title overlay */}
                  <div className="absolute bottom-6 left-6 right-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-2xl transform transition-all duration-500 hover:scale-105"
                      style={{ textShadow: '0 0 20px rgba(0,0,0,0.8)' }}>
                      {selectedMovie.Title}
                    </h2>
                  </div>
                </div>
              )}

              <div className="p-6 sm:p-8 space-y-8">
                {!selectedMovie.Poster || selectedMovie.Poster === 'N/A' && (
                  <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-transparent bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-center">
                    {selectedMovie.Title}
                  </h2>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-4">
                    {[
                      { label: "Year", value: selectedMovie.Year, icon: "📅" },
                      { label: "Released", value: selectedMovie.Released, icon: "🗓️" },
                      { label: "Runtime", value: selectedMovie.Runtime, icon: "⏱️" },
                    ].map((item, index) => (
                      <div key={item.label}
                        className="flex items-center gap-4 p-4 bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700/30 hover:border-indigo-500/50 transition-all duration-500 transform hover:scale-105 hover:shadow-lg group"
                        style={{ animationDelay: `${index * 100}ms` }}>
                        <span className="text-xl group-hover:scale-125 transition-transform duration-300">{item.icon}</span>
                        <span className="text-gray-400 font-medium min-w-[80px]">{item.label}:</span>
                        <span className="text-white font-bold group-hover:text-indigo-300 transition-colors duration-300">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    {[
                      { label: "IMDb", value: `⭐ ${selectedMovie.imdbRating}/10`, icon: "🏆" },
                      { label: "Genre", value: selectedMovie.Genre, icon: "🎭" },
                      { label: "Director", value: selectedMovie.Director, icon: "🎬" },
                    ].map((item, index) => (
                      <div key={item.label}
                        className="flex items-center gap-4 p-4 bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700/30 hover:border-purple-500/50 transition-all duration-500 transform hover:scale-105 hover:shadow-lg group"
                        style={{ animationDelay: `${(index + 3) * 100}ms` }}>
                        <span className="text-xl group-hover:scale-125 transition-transform duration-300">{item.icon}</span>
                        <span className="text-gray-400 font-medium min-w-[80px]">{item.label}:</span>
                        <span className="text-white font-bold group-hover:text-purple-300 transition-colors duration-300">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedMovie.Plot && selectedMovie.Plot !== 'N/A' && (
                  <div className="mt-8 p-6 bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-700/30 hover:border-cyan-500/50 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-xl group">
                    <h3 className="text-xl sm:text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text mb-4 flex items-center gap-3">
                      <span className="group-hover:animate-bounce">📖</span>
                      Plot Synopsis
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-base sm:text-lg group-hover:text-white transition-colors duration-500"
                      style={{ textShadow: '0 0 10px rgba(255,255,255,0.1)' }}>
                      {selectedMovie.Plot}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(30px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
        
        @keyframes scale-in {
          from { 
            opacity: 0; 
            transform: scale(0.8) rotateY(-10deg);
          }
          to { 
            opacity: 1; 
            transform: scale(1) rotateY(0deg);
          }
        }
        
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes rotate-y-12 {
          to { transform: rotateY(12deg); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scale-in 0.5s ease-out forwards;
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-gpu {
          transform: translateZ(0);
        }
        
        .rotate-y-12 {
          transform: rotateY(12deg);
        }
        
        .bg-size-200 {
          background-size: 200% 200%;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Custom hover effects */
        .group:hover .group-hover\\:rotate-y-12 {
          transform: rotateY(12deg);
        }
        
        /* Smooth scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.3);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #6366f1, #8b5cf6);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #4f46e5, #7c3aed);
        }
      `}</style>
    </div>
  );
}