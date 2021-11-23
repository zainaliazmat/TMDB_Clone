import React, { useContext, useState } from "react";
import "./nav.css";
import genersList from "../genersList";
import { RootContext } from "../../context/root-context";
import { IoIosArrowForward } from "react-icons/io";

export const Nav = (props) => {
  const { movieGener, setMovieGener } = useContext(RootContext);
  const { movieTv, setMovieTv } = useContext(RootContext);
  const { pageNumber, setPageNumber } = useContext(RootContext);

  return (
    <div>
      <header className="header">
        <span
          className="movies"
          onClick={() => {
            setMovieTv("movie");
            setMovieGener(genersList.movies[0]);
            setPageNumber(1);
          }}
        >
          Movies
        </span>
        <span
          className="tv"
          onClick={() => {
            setMovieTv("tv");
            setMovieGener(genersList.tv[0]);
            setPageNumber(1);
          }}
        >
          Tv Series
        </span>
        {movieTv === "movie" ? (
          <div className="underLine-Movie"></div>
        ) : (
          <div className="underLine-Tv"></div>
        )}
        {movieTv === "movie" ? (
          <nav className="geners scrollbar-css">
            {genersList.movies.map((gener) => (
              <span
                id={gener.id}
                onClick={() => {
                  setMovieGener(gener);
                  setPageNumber(1);
                }}
              >
                {gener.name}
              </span>
            ))}
          </nav>
        ) : (
          <nav className="geners scrollbar-css">
            {genersList.tv.map((gener) => (
              <span
                id={gener.id}
                onClick={() => {
                  setMovieGener(gener);
                  setPageNumber(1);
                }}
              >
                {gener.name}
              </span>
            ))}
          </nav>
        )}
      </header>
      <div className="current-page">
        <span className="currentMovieTv">
          {movieTv === "tv" ? "Tv Series" : movieTv}
        </span>
        <IoIosArrowForward className="IoIosArrowForward" />
        <span className="currentGen">{movieGener.name}</span>
      </div>
    </div>
  );
};
