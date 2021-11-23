import React, { useState } from "react";
import RootContext from "./context/root-context";
import ProtectedRoute from "./hoc/protectedRoute";
import { DetailPage } from "./components/movie-detail-page/detail-page";
import { Home } from "./hoc/home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

export default function App() {
  return (
    <RootContext>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/detail/movie/:id">
              <DetailPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </RootContext>
  );
}
