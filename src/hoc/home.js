import React, { useState, useContext } from "react";
import "./home.css";
import { TmdbIcon } from "../components/TMDB-Icon/tmdbIcon";
import { MovieCard } from "../components/card";
import data from "../components/data";
import axios from "axios";
import { RootContext } from "../context/root-context";
import { Nav } from "../components/navbar/nav";

export const Home = () => {
  const [movieData, setMovieData] = useState(data);
  const { movieGener, setMovieGener } = useContext(RootContext);
  const { movieTv, setMovieTv } = useContext(RootContext);
  const { pageNumber, setPageNumber } = useContext(RootContext);

  const URL =
    "https://api.themoviedb.org/3/discover/" +
    movieTv +
    "?api_key=75b1242fafea7d5177dca77f56a9e008&page=" +
    pageNumber +
    "&with_genres=" +
    movieGener.id;

  React.useEffect(() => {
    localStorage.removeItem("BaseURL");
    localStorage.setItem("BaseURL", URL);
    const BaseURL = localStorage.getItem("BaseURL");
    axios.get(BaseURL).then((response) => {
      setMovieData(response.data.results);
      console.log(response.data.results[0]);
    });
  }, [pageNumber, movieGener, movieTv]);

  return (
    <div className="Home-display">
      <TmdbIcon />
      <Nav />
      <div className="moviecard-display">
        {movieData.map((movie) => (
          <MovieCard
            id={movie.id}
            title={movie.original_title}
            name={movie.original_name}
            URL={"https://image.tmdb.org/t/p/w154/" + movie.poster_path}
          />
        ))}
      </div>
      <nav className="page-nav">
        <div
          className="previous-backword"
          onClick={() => {
            if (pageNumber > 1) {
              setPageNumber(pageNumber - 1);
            }
          }}
        >
          <div className="backword-icon"></div>
          <span className="previous-page">Previous</span>
        </div>
        <span className="page-number">{pageNumber}</span>
        <div
          className="next-forward"
          onClick={() => {
            if (pageNumber < 500) {
              setPageNumber(pageNumber + 1);
            }
          }}
        >
          <span className="next-page">Next</span>
          <div className="forward-icon"></div>
        </div>
      </nav>
    </div>
  );
};
