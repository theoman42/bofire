import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import TheApp from "./components/TheApp.js/index.js";
import { goHome } from "./store/currentMenuContent";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);
  const [showLoginForm, setShowLoginForm] = useState(true);
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
            {showLoginForm ? (
              <LoginFormPage
                loginButton={setShowLoginForm}
                showForm={showLoginForm}
              />
            ) : (
              <SignupFormPage
                loginButton={setShowLoginForm}
                showForm={showLoginForm}
              />
            )}
          </Route>
        ))}
    </>
  );
}

export default App;
