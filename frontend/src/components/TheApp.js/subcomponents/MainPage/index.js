// frontend/src/components/Navigation/index.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import LeftMenu from "./LeftMenu";
import Content from "./Content";
import "./MainPage.css";

const MainPage = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  return (
    <div className="main-page-wrapper">
      <LeftMenu />
      <Content />
    </div>
  );
};

export default MainPage;
