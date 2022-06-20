import React, { createContext, useState, useEffect } from "react";

export const FavoriteMoviesContext = createContext();

function FavoriteContextProvider({ children }) {
  const [favorited, setFavorited] = useState([]);

  useEffect(() => {
    const savedMovies = localStorage.getItem("movies");
    if (savedMovies) {
      setFavorited(JSON.parse(savedMovies));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(favorited));
  }, [favorited]);

  function addToFavorites(id) {
    setFavorited((prev) => [...prev, id]);
  }

  function removeFromFavorited(id) {
    const filtered = favorited.filter(el => el !== id)
    setFavorited(filtered)
    
  }

 
  return (
    <FavoriteMoviesContext.Provider value={{ favorited, addToFavorites, removeFromFavorited}}>
     
      {children}
    </FavoriteMoviesContext.Provider>
  );
}

export default FavoriteContextProvider;
