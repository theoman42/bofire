// frontend/src/components/Navigation/index.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import LeftMenu from "./LeftMenu";
import Content from "./Content.js";
import "./MainPage.css";
import { goHome } from "../../../../store/currentMenuContent";
import { useState } from "react";
import { useEffect } from "react";

const MainPage = () => {
  const user = useSelector((state) => state.session.user);
  const currentMenuContent = useSelector((state) => state.currentMenuContent);

  const [isLoaded, setIsLoaded] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(goHome()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <div className="main-page-wrapper">
          <LeftMenu />
          <Content />
        </div>
      )}
    </>
  );
};

export default MainPage;
