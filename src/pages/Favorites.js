import React from "react";
import Navbar from "../components/Navbar";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Card from "../components/Card";
import { FavoriteMoviesContext } from "../contexts/FavoriteMoviesContext";
import { ThemeContext } from "../contexts/ThemeContext";
import ThemeToggler from "../components/ThemeToggler";

function Favorites(props) {
  const ctx = useContext(FavoriteMoviesContext);
  const themeCtx = useContext(ThemeContext);
  const [favoriteMovies, setFavoriteMovies] = useState([]);


  useEffect(() => {
    const key = process.env.REACT_APP_API_KEY;

    const savedMovies = ctx.favorited;
    const favoriteMoviesPromises = [];

    for (let i = 0; i < savedMovies.length; i++) {
      favoriteMoviesPromises.push(
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${savedMovies[i]}?api_key=${key}&language=en-US`
          )
          .then((res) => res.data)
      );
    }
    Promise.all(favoriteMoviesPromises).then((newFavoriteMovies) =>
      setFavoriteMovies(newFavoriteMovies)
    );
  }, [ctx.favorited]);


  return (
    <>
      <Navbar />
      <ThemeToggler />
      <main className={themeCtx.theme === 'dark' ? 'dark' : 'light'}>
        <div className="favorites-container">
          {favoriteMovies.map((movie) => {
            return <Card key={movie.id} movie={movie} />;
          })}
        </div>
      </main>
    </>
  );
}

export default Favorites;
