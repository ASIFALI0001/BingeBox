// App.jsx
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import CategoryPage from "./components/CategoryPage";

function App() {
  const [currentPage, setCurrentPage] = useState("home"); // "home", "movies", "webseries", "anime"
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [allMovies, setAllMovies] = useState({}); // store movies by category+genre key

  // 🔹 Parse URL to set state (runs on load + when user presses back/forward)
  useEffect(() => {
    const parsePath = () => {
      const path = window.location.pathname.replace("/", ""); // e.g. "movies/horror"
      if (!path) {
        setCurrentPage("home");
        setSelectedCategory(null);
        setSelectedGenre(null);
        return;
      }

      const parts = path.split("/"); // ["movies", "horror"]
      setCurrentPage(parts[0] || "home");
      setSelectedCategory(parts[0] || null);
      setSelectedGenre(parts[1] || null);
    };

    parsePath(); // run on first load

    window.addEventListener("popstate", parsePath);
    return () => window.removeEventListener("popstate", parsePath);
  }, []);

  // 🔹 Load movies from localStorage on mount
  useEffect(() => {
    const storedAllMovies = localStorage.getItem("allMovies");
    if (storedAllMovies) {
      setAllMovies(JSON.parse(storedAllMovies));
    }
  }, []);

  // 🔹 Save to localStorage whenever allMovies changes
  useEffect(() => {
    if (Object.keys(allMovies).length > 0) {
      localStorage.setItem("allMovies", JSON.stringify(allMovies));
    }
  }, [allMovies]);

  // 🔹 Get movies for current category+genre
  const getCurrentMovies = () => {
    if (!currentPage || currentPage === "home" || !selectedGenre) return [];
    const key = `${currentPage}_${selectedGenre}`;
    return allMovies[key] || [];
  };

  // 🔹 Update movies for category+genre
  const updateMovies = (newMovies) => {
    if (!currentPage || currentPage === "home" || !selectedGenre) return;
    const key = `${currentPage}_${selectedGenre}`;
    setAllMovies((prev) => ({
      ...prev,
      [key]: newMovies,
    }));
  };

  return (
    <div className="bg-gray-950 min-h-screen text-white">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {currentPage === "home" && (
        <HomePage
          setCurrentPage={setCurrentPage}
          setSelectedGenre={setSelectedGenre}
          setSelectedCategory={setSelectedCategory}
        />
      )}

      {["movies", "webseries", "anime"].includes(currentPage) && (
        <CategoryPage
          category={currentPage}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          movies={getCurrentMovies()}
          setMovies={updateMovies}
          allMovies={allMovies} // Add this prop
        />
      )}
    </div>
  );
}

export default App;
