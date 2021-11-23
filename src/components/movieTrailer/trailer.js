import React, { useContext, useState } from "react";
import "./trailer.css";
import YouTube from "react-youtube";
import { RootContext } from "../../context/root-context";
import axios from "axios";
import data from "../data";
import ReactLoading from "react-loading";

export const Trailer = (props) => {
  const { movieId, setMovieId } = useContext(RootContext);
  const { movieTv, setMovieTv } = useContext(RootContext);

  const [trailerKey, setTrailerKey] = useState(data);
  const [baseURL, setBaseURL] = useState("");

  React.useEffect(() => {
    setBaseURL(
      "https://api.themoviedb.org/3/" +
        movieTv +
        "/" +
        movieId +
        "/videos?api_key=75b1242fafea7d5177dca77f56a9e008"
    );
  }, [movieId]);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      console.log(response.data);
      setTrailerKey(response.data.results[0].key);
    });
  }, [baseURL]);

  const opts = {
    height: "550",
    width: "970",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="trailer-dashboard">
      <div className="border" onClick={() => props.show(false)}></div>

      <div className="loading">
        <ReactLoading type="cylon" height={667} width={575} />
      </div>
      <div className="trailer">
        <YouTube videoId={trailerKey} opts={opts} />;
      </div>
    </div>
  );
};
