import React from "react";
import { FavoriteMoviesContext } from "../contexts/FavoriteMoviesContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";
import {BsHeartFill} from 'react-icons/bs';

function Card(props) {
  const ctx = useContext(FavoriteMoviesContext);
  const themeCtx = useContext(ThemeContext);


  return (
    <div
      className={
        ctx.favorited.includes(props.movie.id) && themeCtx.theme === 'light'
          ? "favorited movie-card light"
          : "movie-card"
      }
    >
      <BsHeartFill className={ctx.favorited.includes(props.movie.id) ? 'heart' : 'no-heart'}/>
      <div className="movie-img">
        <img
          alt="movie poster"
          src={
            props.movie.poster_path
              ? `https://image.tmdb.org/t/p/w200/${props.movie.poster_path}`
              : "./generic-title.png"
          }
        />
      </div>
      <h2>{props.movie.original_title}</h2>
      <p>{props.movie.vote_average}/10</p>
      <button
        className="add-btn"
        onClick={() => ctx.addToFavorites(props.movie.id)}
      >
        Add
      </button>
      <button
        className={themeCtx.theme === 'dark' ? 'remove-btn dark' : 'remove-btn light'}
        onClick={() => ctx.removeFromFavorited(props.movie.id)}
      >
        Remove
      </button>
    </div>
  );
}

export default Card;
