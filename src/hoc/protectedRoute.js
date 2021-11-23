import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ children, ...restProps }) => {
  let token = localStorage.getItem("token");

  return (
    <Route
      {...restProps}
      render={() => {
        if (token) {
          return children;
        } else {
          return <Redirect to="/home" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
