import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getUserOwnedHomes } from "../../store/userOwnedHomes";
import { getUserPartHomes } from "../../store/userPartHomes";
import Navigation from "./subcomponents/Navigation";
import RightBar from "./subcomponents/RightBar/index.js";
import MainPage from "./subcomponents/MainPage";
import "./TheApp.css";

const TheApp = ({ userId }) => {
  const dispatch = useDispatch();
  // dispatch(getUserPartHomes(userId));
  // const currentUserHomes = Object.values(useSelector((state) => state.spots));
  return (
    <div className="the-app-styling-container">
      <Navigation />
      <MainPage />
      <RightBar />
    </div>
  );
};

export default TheApp;
