import React, { useContext } from "react";
import "./style.css";
import { RootContext } from "../../context/root-context";
import { useHistory } from "react-router-dom";

export const MovieCard = ({ id, URL, name, title }) => {
  const { movieId, setMovieId } = useContext(RootContext);
  const history = useHistory();

  return (
    <div className="card" id={id} key={id}>
      <div className="card-image">
        <img
          src={URL}
          alt={name || title}
          onClick={() => {
            setMovieId(id);
            history.push("/detail/movie/:" + id);
          }}
        />
      </div>
    </div>
  );
};
