import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import TheApp from "./components/TheApp.js/index.js";
import NotLoggedIn from "./components/NotLoggedIn";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded &&
        (user ? (
          <Route path="/">
            <TheApp userId={user.id} isLoaded={isLoaded} />
          </Route>
        ) : (
          <Route path="/">
            <NotLoggedIn />
          </Route>
        ))}
    </>
  );
}

export default App;
