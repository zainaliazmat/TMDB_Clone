import React from "react";
import data from "../data";
import "./network.css";

export const Network = ({ network }) => {
  let logos = data;
  if (network) {
    logos = network.map(
      (logo) => `https://image.tmdb.org/t/p/original${logo.logo_path}`
    );
  }

  return (
    <div className="logoDiv">
      {logos.map((logo) => (
        <div className="logo">
          <img src={logo} alt="" />
        </div>
      ))}
    </div>
  );
};
