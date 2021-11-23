import React, { useContext, useState } from "react";
import "./cast.css";
import { RootContext } from "../../context/root-context";
import axios from "axios";
import data from "../data";

export const Cast = () => {
  const { movieId, setMovieId } = useContext(RootContext);
  const { movieTv, setMovieTv } = useContext(RootContext);

  const [castInfo, setCastInfo] = useState(data);
  const [baseURL, setBaseURL] = useState("");

  React.useEffect(() => {
    setBaseURL(
      "https://api.themoviedb.org/3/" +
        movieTv +
        "/" +
        movieId +
        "/credits?api_key=75b1242fafea7d5177dca77f56a9e008"
    );
  }, [movieId]);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      console.log(response.data.cast);
      setCastInfo(
        response.data.cast.filter((cast) => cast.profile_path !== null)
      );
    });
  }, [baseURL]);

  return (
    <div className="cast-display custom-scrollbar-css">
      {castInfo.map((cast) => (
        <div className="cast" key={cast.id} id={cast.id}>
          <div className="cast-card">
            <div className="profile-pic">
              <img
                src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`}
                alt=""
              />
            </div>
            <div className="ON-CN">
              <span className="orignal-name">{cast.original_name}</span>
              <span className="character">Character</span>
              <span className="chracter-name">{cast.character}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
