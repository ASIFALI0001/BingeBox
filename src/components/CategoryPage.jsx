import { useState, useEffect } from 'react';
import GenreCard from './GenreCard';
import MoviesList from './MoviesList';
import MovieCard from './MovieCard';

export default function CategoryPage({ category, selectedGenre, setSelectedGenre, movies, setMovies, allMovies }) {
  const [collectionMovies, setCollectionMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Load all movies for this category from allMovies state
  useEffect(() => {
    const loadCollectionMovies = () => {
      // Check if allMovies exists and is an object
      if (!allMovies || typeof allMovies !== 'object') {
        console.log('allMovies is not available:', allMovies);
        setCollectionMovies([]);
        return;
      }

      const categoryMovies = [];
      const genres = {
        movies: ['horror', 'scifi', 'marvel', 'disaster', 'crime', 'thriller', 'kdrama'],
        webseries: ['horror', 'scifi', 'marvel', 'disaster', 'crime', 'thriller', 'kdrama'],
        anime: ['action', 'romance', 'comedy', 'adventure', 'fantasy', 'slice-of-life', 'supernatural']
      };

      const currentGenres = genres[category] || [];

      console.log('Checking category:', category);
      console.log('Available keys in allMovies:', Object.keys(allMovies));

      currentGenres.forEach(genreId => {
        const key = `${category}_${genreId}`;
        const genreMovies = allMovies[key] || [];
        console.log(`Key: ${key}, Movies found:`, genreMovies.length);

        if (Array.isArray(genreMovies) && genreMovies.length > 0) {
          categoryMovies.push(...genreMovies);
        }
      });

      console.log('Total collection movies:', categoryMovies.length);
      setCollectionMovies(categoryMovies);
    };

    loadCollectionMovies();
  }, [category, allMovies]); // Re-load when category changes or allMovies updates

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);

    // push full URL like /movies/horror or /anime/action
    window.history.pushState(
      { page: `${category}/${genreId}` },
      "",
      `/${category}/${genreId}`
    );
  };

  const handleCollectionClick = () => {
    setSelectedGenre('collection');

    // push URL for collection view
    window.history.pushState(
      { page: `${category}/collection` },
      "",
      `/${category}/collection`
    );
  };

  // Show full movie details - using backend API
  const handleMovieClick = (id) => {
    fetch(`/api/movies?i=${encodeURIComponent(id)}`)
      .then(res => res.json())
      .then(data => {
        setSelectedMovie(data);
      })
      .catch(err => console.error("Movie details error:", err));
  };


  const genres = {
    movies: [
      { id: 'horror', name: 'Horror', icon: '👻' },
      { id: 'scifi', name: 'Sci-Fi', icon: '🚀' },
      { id: 'marvel', name: 'Marvel', icon: '🦸‍♂️' },
      { id: 'disaster', name: 'Disaster', icon: '🌪️' },
      { id: 'crime', name: 'Crime', icon: '🕵️‍♂️' },
      { id: 'thriller', name: 'Thriller', icon: '🔪' },
      { id: 'kdrama', name: 'K-Drama', icon: '🇰🇷' }
    ],
    webseries: [
      { id: 'horror', name: 'Horror', icon: '👻' },
      { id: 'scifi', name: 'Sci-Fi', icon: '🚀' },
      { id: 'marvel', name: 'Marvel', icon: '🦸‍♂️' },
      { id: 'disaster', name: 'Disaster', icon: '🌪️' },
      { id: 'crime', name: 'Crime', icon: '🕵️‍♂️' },
      { id: 'thriller', name: 'Thriller', icon: '🔪' },
      { id: 'kdrama', name: 'K-Drama', icon: '🇰🇷' }
    ],
    anime: [
      { id: 'action', name: 'Action', icon: '⚔️' },
      { id: 'romance', name: 'Romance', icon: '💖' },
      { id: 'comedy', name: 'Comedy', icon: '😂' },
      { id: 'adventure', name: 'Adventure', icon: '🗺️' },
      { id: 'fantasy', name: 'Fantasy', icon: '🧙‍♂️' },
      { id: 'slice-of-life', name: 'Slice of Life', icon: '🌸' },
      { id: 'supernatural', name: 'Supernatural', icon: '👹' }
    ]
  };

  const currentGenres = genres[category] || [];
  const filteredMovies = movies.filter(movie =>
    movie.category === category && (!selectedGenre || movie.genre === selectedGenre)
  );

  // Handle Your Collection view
  if (selectedGenre === 'collection') {
    return (
      <div className="min-h-screen bg-gray-950">
        {/* Breadcrumb */}
        <div className="bg-gray-900 py-4 px-6 border-b border-gray-700">
          <div className="max-w-7xl mx-auto">
            <p className="text-gray-400 text-sm mb-2">You are in:</p>
            <h1 className="text-2xl font-bold text-white">
              {category.charAt(0).toUpperCase() + category.slice(1)} → Your Collection
            </h1>
          </div>
        </div>

        {/* Back Button */}
        <div className="p-6">
          <button
            onClick={() => {
              setSelectedGenre(null);
              // push back to just category, e.g. /movies
              window.history.pushState(
                { page: category },
                "",
                `/${category}`
              );
            }}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-white transition-colors mb-6"
          >
            ← Back to {category.charAt(0).toUpperCase() + category.slice(1)} Categories
          </button>
        </div>

        {/* Collection Display with Movie Details Modal */}
        <div className="px-4 pb-12 relative">
          {collectionMovies.length > 0 ? (
            <div className="max-w-8xl mx-auto">
              <div className="mb-8 text-center animate-fade-in">
                <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text mb-3">
                  Your Complete Collection
                </h2>
                <div className="flex items-center justify-center gap-3 text-gray-400">
                  <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent w-20"></div>
                  <p className="text-lg font-medium">
                    <span className="text-indigo-400 font-bold">{collectionMovies.length}</span> {collectionMovies.length === 1 ? 'item' : 'items'} across all genres
                  </p>
                  <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent w-20"></div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4 sm:gap-6 lg:gap-8">
                {collectionMovies.map((movie, index) => (
                  <div
                    key={`${movie.imdbID}_${movie.genre}`}
                    className="animate-fade-in-up"
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    <MovieCard
                      movie={movie}
                      onClick={() => handleMovieClick(movie.imdbID)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-20 sm:py-32 relative z-10 animate-fade-in">
              <div className="relative group">
                <div className="text-8xl sm:text-9xl mb-6 transform transition-all duration-700 group-hover:scale-110 group-hover:rotate-12 cursor-pointer">
                  📚
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-700 opacity-0 group-hover:opacity-100"></div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text mb-4">
                Your Collection is Empty
              </h3>
              <p className="text-gray-500 text-lg sm:text-xl max-w-md mx-auto leading-relaxed">
                Start adding {category} to your collection by exploring different genres!
              </p>
              <div className="mt-8 flex justify-center">
                <div className="h-1 w-32 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Modal with 3D effects - copied from MoviesList */}
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
      </div>
    );
  }

  // Handle specific genre view
  if (selectedGenre && selectedGenre !== 'collection') {
    return (
      <div className="min-h-screen bg-gray-950">
        {/* Breadcrumb */}
        <div className="bg-gray-900 py-4 px-6 border-b border-gray-700">
          <div className="max-w-7xl mx-auto">
            <p className="text-gray-400 text-sm mb-2">You are in:</p>
            <h1 className="text-2xl font-bold text-white">
              {category.charAt(0).toUpperCase() + category.slice(1)} → {currentGenres.find(g => g.id === selectedGenre)?.name}
            </h1>
          </div>
        </div>

        {/* Back Button */}
        <div className="p-6">
          <button
            onClick={() => {
              setSelectedGenre(null);
              // push back to just category, e.g. /movies
              window.history.pushState(
                { page: category },
                "",
                `/${category}`
              );
            }}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-white transition-colors mb-6"
          >
            ← Back to {category.charAt(0).toUpperCase() + category.slice(1)} Categories
          </button>
        </div>

        {/* Movies List */}
        <MoviesList
          movies={filteredMovies}
          setMovies={setMovies}
          category={category}
          genre={selectedGenre}
        />
      </div>
    );
  }

  // Main category page with genre cards
  return (
    <div className="min-h-screen bg-gray-950 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-white mb-12">
          {category.charAt(0).toUpperCase() + category.slice(1)} Categories
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {/* Your Collection Card - Always first */}
          <div
            onClick={handleCollectionClick}
            className="group relative bg-gradient-to-br from-purple-600/20 via-indigo-600/15 to-cyan-600/20 hover:from-purple-500/30 hover:via-indigo-500/25 hover:to-cyan-500/30 backdrop-blur-xl rounded-xl border border-purple-500/30 hover:border-purple-400/60 p-6 cursor-pointer transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(147,51,234,0.3)] overflow-hidden perspective-1000"
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden'
            }}
          >
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-indigo-500/0 to-cyan-500/0 group-hover:from-purple-500/20 group-hover:via-indigo-500/15 group-hover:to-cyan-500/20 rounded-xl transition-all duration-1000 blur-2xl transform group-hover:scale-150"></div>

            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
              <div className="absolute top-3 left-3 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000 group-hover:animate-ping"></div>
              <div className="absolute top-6 right-4 w-0.5 h-0.5 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1200 group-hover:animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <div className="absolute bottom-8 left-6 w-0.5 h-0.5 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1400 group-hover:animate-bounce" style={{ animationDelay: '0.6s' }}></div>
            </div>

            {/* Main content */}
            <div className="relative z-10 text-center transform transition-all duration-700 group-hover:scale-105">
              {/* Special collection icon with enhanced animation */}
              <div className="relative mb-4">
                <div className="text-4xl sm:text-5xl transform transition-all duration-700 group-hover:scale-125 group-hover:rotate-12 inline-block">
                  📚
                </div>
                {/* Orbiting sparkles */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000">
                  <div className="absolute -top-2 -right-2 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
                  <div className="absolute -bottom-2 -left-2 w-1 h-1 bg-indigo-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute top-1/2 -right-3 w-0.5 h-0.5 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-transparent bg-gradient-to-r from-purple-200 via-indigo-200 to-cyan-200 bg-clip-text mb-2 transform transition-all duration-500 group-hover:scale-110">
                Your Collection
              </h3>

              <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-all duration-300 font-medium">
                {collectionMovies.length} {collectionMovies.length === 1 ? 'item' : 'items'}
              </p>

              {/* Collection preview indicator */}
              <div className="mt-3 flex justify-center">
                <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 backdrop-blur-sm text-purple-300 text-xs px-3 py-1.5 rounded-full font-medium border border-purple-400/30 group-hover:border-purple-300/50 group-hover:bg-purple-500/30 transition-all duration-500 transform group-hover:scale-110">
                  ✨ All Genres
                </div>
              </div>
            </div>

            {/* Enhanced floating border effect */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-purple-500/20 via-indigo-500/10 to-cyan-500/20 animate-pulse"></div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-bl from-cyan-500/15 via-transparent to-purple-500/15" style={{ animation: 'gradient-shift 4s ease-in-out infinite' }}></div>
            </div>

            {/* Enhanced reflection effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-all duration-1000 rounded-xl transform group-hover:translate-x-1 group-hover:-translate-y-1"></div>
          </div>

          {/* Regular Genre Cards */}
          {currentGenres.map((genre) => (
            <GenreCard
              key={genre.id}
              genre={genre.name}
              icon={genre.icon}
              onClick={() => handleGenreClick(genre.id)}
              isActive={selectedGenre === genre.id}
            />
          ))}
        </div>
      </div>

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
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scale-in 0.5s ease-out forwards;
        }
        
        .perspective-1000 {
          perspective: 1000px;
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
