import React, { useState } from "react";

export const RootContext = React.createContext();

export default ({ children }) => {
  const [movieId, setMovieId] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [movieGener, setMovieGener] = useState({ id: 28, name: "Action" });
  const [movieTv, setMovieTv] = useState("movie");
  const defaultValues = {
    movieId,
    setMovieId,
    pageNumber,
    setPageNumber,
    movieGener,
    setMovieGener,
    movieTv,
    setMovieTv,
  };
  console.log("context = " + movieId);
  return (
    <RootContext.Provider value={defaultValues}>
      {children}
    </RootContext.Provider>
  );
};
