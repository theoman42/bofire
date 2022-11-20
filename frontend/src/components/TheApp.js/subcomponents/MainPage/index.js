// frontend/src/components/Navigation/index.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import LeftMenu from "./LeftMenu";
import Content from "./Content";
import "./MainPage.css";
import { goHome } from "../../../../store/currentMenuContent";
import { useState } from "react";
import { useEffect } from "react";

const MainPage = () => {
  const user = useSelector((state) => state.session.user);
  const currentMenuContent = useSelector((state) => state.currentMenuContent);

  const [isLoaded, setIsLoaded] = useState(false);
  const [type, setType] = useState("homePage");
  const [isOwned, setIsOwned] = useState(false);
  const [menuContent, setMenuContent] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(goHome()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    if (currentMenuContent.type) setType(currentMenuContent.type);
    if (currentMenuContent.type === "singleHome")
      setIsOwned(currentMenuContent.home.ownerId === user.id);
    setMenuContent(currentMenuContent);
  }, [currentMenuContent, user]);

  return (
    <>
      {isLoaded && (
        <div className="main-page-wrapper">
          <LeftMenu
            isOwned={isOwned}
            type={type}
            menuContent={menuContent}
            setType={setType}
          />
          <Content isOwned={isOwned} type={type} />
        </div>
      )}
    </>
  );
};

export default MainPage;
