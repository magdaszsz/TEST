import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Card from "../components/Card";
import Loader from "../components/Loader";
import { useState, useEffect, useContext } from "react";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import {ThemeContext} from '../contexts/ThemeContext';
import ThemeToggler from '../components/ThemeToggler';



function Home(props) {

  const themeCtx = useContext(ThemeContext); 


  const [moviesData, setMoviesData] = useState([]);
  const [numOfMovies, setNumOfMovies] = useState(10);
  const [search, setSearch] = useState(getDayOfWeek());
  const [spinner, setSpinner] = useState(true);
  const [goodToBad, setGoodToBad] = useState(null);


  function getDayOfWeek() {
    const day = new Date().getDay();
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return daysOfWeek[day]
  }

  function bestToWorst() {
    setGoodToBad(true);
  }

  function worstToBest() {
    setGoodToBad(false);
  }

  useEffect(() => {
    const key = process.env.REACT_APP_API_KEY;
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${search}`
      )
      .then((res) => {
        setMoviesData(res.data.results);
        setSpinner(false);
        setGoodToBad(null);
    
      });
  }, [search]);

  // CODE FOR WHEN I DON'T WANT ANY INITIAL RESULTS

  // const isInitialMount = useRef(true);

  // useEffect(() => {
  //   if (isInitialMount.current) {
  //     isInitialMount.current = false;
  //   } else {
  //     axios
  //       .get(
  //         `https://api.themoviedb.org/3/search/movie?api_key=ed82f4c18f2964e75117c2dc65e2161d&query=${search}`
  //       )
  //       .then((res) => setMoviesData(res.data.results));
  //   }
  // }, [search]);
  return (
    <>
      <Navbar />
     <ThemeToggler/>
      <main className={themeCtx.theme === 'dark' ? 'dark' : 'light'}>
 
        <form>
          <input
            type="text"
            placeholder="Search for movies"
            id="search-input"
            onChange={(e) => {
              setSearch(e.target.value);
              setNumOfMovies(10);
            }}
          />
          {/* <input type="submit" value="Search" /> */}
        </form>
        <div className="sorting-btns">
          <button id="top" onClick={bestToWorst}>
            <BsArrowUp />
          </button>
          <button id="bottom" onClick={worstToBest}>
            <BsArrowDown />
          </button>
        </div>

        {spinner ? <Loader /> : ""}

        <div>
          <div className="results">
            {!moviesData.length && <p>No results found</p>}
            {moviesData
              .slice(0, numOfMovies)
              .sort((a,b) => {
                if(goodToBad) {
                  return b.vote_average - a.vote_average
                } else if (goodToBad === false){
                  return a.vote_average - b.vote_average
                }
              })
              .map((movie) => (
                <Card key={movie.id}  movie={movie} />
              ))}
          </div>
        </div>
          {numOfMovies < moviesData.length && (
            <button className="more-btn" onClick={() => setNumOfMovies((prevNum) => prevNum + 6)}>
              Show More
            </button>
          )}
      </main>
   </>
  );
}

export default Home;
