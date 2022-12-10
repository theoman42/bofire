import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import LoginFormPage from "./LoginFormPage";
import SignupFormPage from "./SignupFormPage";
import "./index.css";

function NotLoggedIn({ loginButton, showForm }) {
  const [showLoginForm, setShowLoginForm] = useState(true);

  return (
    <>
      <div className="logged-out-page-father">
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
      </div>
    </>
  );
}

export default NotLoggedIn;
