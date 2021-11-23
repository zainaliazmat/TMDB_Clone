import React, { useContext, useState } from "react";
import "./detail-page.css";
import { TmdbIcon } from "../TMDB-Icon/tmdbIcon";
import { BsDot } from "react-icons/bs";
import { RootContext } from "../../context/root-context";
import axios from "axios";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Network } from "../productionCompanies/network";
import { Cast } from "../movieCast/cast";
import { Trailer } from "../movieTrailer/trailer";

export const DetailPage = () => {
  const [trailer, setTrailer] = useState(false);
  const { movieId, setMovieId } = useContext(RootContext);
  const { movieTv, setMovieTv } = useContext(RootContext);

  const [movieInfo, setMovieInfo] = useState({
    originalTitle: "",
    movieURL: "",
    backdropURL: "",
    geners: "",
    releaseDate: "",
    runTime: "",
    numberOfSeasons: "",
    voteAverage: "",
    tagline: "",
    overview: "",
    status: "",
    productionCompanies: "",
    language: "",
    budget: "",
  });
  const [baseURL, setBaseURL] = useState("");

  React.useEffect(() => {
    setBaseURL(
      "https://api.themoviedb.org/3/" +
        movieTv +
        "/" +
        movieId +
        "?api_key=75b1242fafea7d5177dca77f56a9e008"
    );
  }, [movieId]);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      console.log(response.data);
      setMovieInfo({
        originalTitle:
          response.data.original_title || response.data.original_name,
        movieURL:
          "https://image.tmdb.org/t/p/original/" + response.data.poster_path,
        backdropURL:
          "https://image.tmdb.org/t/p/original/" + response.data.backdrop_path,
        geners: response.data.genres.map((gen) => gen.name + ", "),
        releaseDate: response.data.release_date,
        runTime: `${Math.floor(response.data.runtime / 60)}h ${
          response.data.runtime % 60
        }m`,
        numberOfSeasons: response.data.number_of_seasons + " Seasons",
        voteAverage:
          parseInt(response.data.vote_average.toString().split(".")[0]) * 10 +
          parseInt(response.data.vote_average.toString().split(".")[1]),
        tagline: response.data.tagline,
        overview: response.data.overview,
        status: response.data.status,
        productionCompanies: response.data.production_companies.filter(
          (network) => network.logo_path !== null
        ),
        language: response.data.spoken_languages[0].english_name,
        budget: response.data.budget,
      });
    });
  }, [baseURL]);

  //console.log(movieInfo);

  const closeTrailer = (close) => {
    setTrailer(close);
  };

  return (
    <div className="movie-detail">
      <TmdbIcon />
      {trailer ? <Trailer show={closeTrailer} /> : null}
      <div className="detail-backdrop">
        <div className="movie-poster">
          <img src={movieInfo.movieURL} alt="" />
        </div>
        <div className="info-backdrop">
          <div className="shade"></div>
          <div className="backdrop-poster">
            <img src={movieInfo.backdropURL} alt="" />
          </div>
          <div className="movie-info">
            <div className="movie-title-orignal">
              <h1>{movieInfo.originalTitle}</h1>
            </div>
            <div className="G-RD-RT">
              <span>{movieInfo.releaseDate}</span>
              <BsDot className="Bsdot" />
              <span>{movieInfo.geners}</span>
              <BsDot className="Bsdot" />
              {movieTv === "movie" ? (
                <span>{movieInfo.runTime}</span>
              ) : (
                <span>{movieInfo.numberOfSeasons}</span>
              )}
            </div>
            <div className="CPB-PTB">
              {movieInfo.voteAverage ? (
                <div className="progress-circle-div">
                  <CircularProgressbar
                    value={movieInfo.voteAverage}
                    text={`${movieInfo.voteAverage}%`}
                  />
                  <span>User Score</span>
                </div>
              ) : null}
              <div className="playTrailer" onClick={() => setTrailer(true)}>
                <div className="play-icon"></div>
                <span>Play Trailer</span>
              </div>
            </div>
            <div className="TL-OV">
              <span className="tagline">{movieInfo.tagline}</span>
              <span className="overview-title">Overview</span>
              <span className="overview-text">{movieInfo.overview}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="other-details">
        <div className="left-detail">
          <span className="cast-text">Top Billed Cast</span>
          <div className="cast-dashboard">
            <div className="ending-gradient-left"></div>
            <div className="ending-gradient-right"></div>
            <Cast />
          </div>
        </div>
        <div className="right-detail">
          <span className="facts heading">Facts</span>
          <div className="movie-facts">
            <div className="status-fact fact-div">
              <span className="status heading">Status</span>
              <span className="status-text">{movieInfo.status}</span>
            </div>
            <div className="network-fact fact-div">
              <span className="network heading">Network</span>
              <Network network={movieInfo.productionCompanies} />
            </div>
            <div className="language-fact fact-div">
              <span className="language heading">Orignal Language</span>
              <span>{movieInfo.language}</span>
            </div>
            <div className="budget-fact fact-div">
              {movieInfo.budget ? (
                <span className="budget heading">Budget</span>
              ) : null}
              {movieInfo.budget ? <span>{movieInfo.budget + " $"}</span> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
