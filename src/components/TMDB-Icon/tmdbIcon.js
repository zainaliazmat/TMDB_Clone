import React from "react";
import "./tmdbIcon.css";
import { useHistory } from "react-router-dom";

export const TmdbIcon = () => {
  let history = useHistory();

  return (
    <div className="icon-bar">
      <div className="tmdb-icon" onClick={() => history.push("/")}>
        <div className="tm">
          <span>TM</span>
          <span>DB</span>
          <div className="white-bar"></div>
        </div>
      </div>
    </div>
  );
};
